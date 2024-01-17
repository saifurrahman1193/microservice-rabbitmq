import { AppModel } from '../../model/app/app.model';
import { Namespace } from '../../model/app/namespace.model';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import mongoose, { ClientSession } from 'mongoose';
import { Request } from 'express';
import { paginate } from '../../helper/pagination.helper';
import { removeParameterFromURL } from '../../helper/url.helper';


// const getAppsPaginated = async (req: Request): Promise<any> => {
//     let data = await AppModel.find()
//         .lean()
//         .populate('namespace') // Use the virtual property 'namespaces'
//         .exec();

//     return data;
// };

// const getAppsPaginated = async (req: Request): Promise<any> => {
//     let formData = { ...req?.query, ...req?.body }

//     const data = await paginate(req, formData, AppModel);

//     return data;
// };

const getAppsPaginated = async (req: Request): Promise<any> => {
    // let formData = { ...req?.query, ...req?.body }

    // let page = 1;
    // let currentPage = parseInt(page.toString()) || 1; // default current page 1
    // let total_count = await AppModel.countDocuments() || 0;
    // let perPage = Math.max(parseInt(req.perPage.toString(), 10) || 10, 1); // default per page 10 records
    // let pageCount = Math.ceil(total_count / perPage);
    // let previousPage = currentPage > 1 ? (currentPage - 1) : 0; // null to 0 updated ====================
    // let nextPage = pageCount > currentPage ? (currentPage + 1) : null;
    // let current_page_items_count = currentPage == 1 ? perPage : (total_count - (perPage * previousPage)) || 0;
    // let offset = currentPage > 1 ? previousPage * perPage : 0; // start from 0,10,20,30
    // let api_url = removeParameterFromURL(process.env.BASE_URL + req.originalUrl, 'page');

    // let paginator = {
    //     current_page: currentPage,
    //     total_pages: pageCount,
    //     previous_page_url: previousPage ? `${api_url}?page=${previousPage}` : null,
    //     next_page_url: nextPage ? `${api_url}?page=${nextPage}` : null,
    //     record_per_page: perPage,
    //     current_page_items_count: current_page_items_count,
    //     total_count: total_count,
    //     pagination_last_page: pageCount,
    //     offset: offset,
    // };
    // let items = AppModel.skip((page - 1) * perPage)
    //             .limit(perPage);

    // return { paginator, items };
};

const getAppByName = async (name: string): Promise<any> => await AppModel.findOne({ name });
const getAppById = async (_id: string): Promise<any> => await AppModel.findOne({ _id });

const createApp = async (values: Record<string, any>): Promise<any> => {
    let session: ClientSession | null = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { name, authentication, is_active, created_by, created_at, namespace } = values;

        const app = await new AppModel({ name, authentication, is_active, created_by, created_at }, { session });

        const namespaces_new = await Namespace.insertMany(
            namespace.map(({ name, path, is_active }: { name: string, path: string, is_active: boolean }) => ({
                name,
                path,
                is_active,
                app_id: app._id,
            }))
        );

        await app.save();

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return {
            data: app.toObject(),
            code: HttpStatusCode.OK,
            status: true,
            msg: ['Successfully created the app'],
            errors: null,
        };
    } catch (error: any) {
        if (session) {
            // If any operation fails, roll back the entire transaction
            await session.abortTransaction();
            session.endSession();
        }

        console.error(error);

        const customErrors = await convertMongoErrorToCustomError(error);
        return {
            data: null,
            code: HttpStatusCode.InternalServerError,
            status: false,
            msg: ['Failed to create the app'],
            errors: customErrors,
        };
    }
};


const updateAppById = async (id: string, values: Record<string, any>): Promise<any> => await AppModel.findByIdAndUpdate(id, values)

export const appService = {
    getAppsPaginated,
    getAppByName,
    getAppById,
    createApp,
    updateAppById,
}