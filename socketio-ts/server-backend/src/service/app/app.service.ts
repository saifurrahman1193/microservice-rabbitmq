import { AppModel } from '../../model/app/app.model';
import { Namespace } from '../../model/app/namespace.model';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import mongoose, { ClientSession } from 'mongoose';
import { Request } from 'express';
import { paginationquery } from '../../helper/paginationquery.helper';

const getAppsPaginated = async (req: Request): Promise<any> => {
    let formData = { ...req?.query, ...req?.body }

    return await paginationquery.paginate({
        request: req, formData: formData, query: AppModel, populate: { path: 'namespace' }, isLean: true, sort: null
    });
};


const getAppByName = async (name: string): Promise<any> => await AppModel.findOne({ name });
const getAppById = async (_id: string | null): Promise<any> => {
    return await AppModel.findOne({ _id })
                .lean(true)
                .populate({ path: 'namespace' })
};

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