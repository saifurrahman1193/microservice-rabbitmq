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
        // session.startTransaction();
        const transactionOptions: any = {
            readPreferences: "primary",
            readConcern: { level: "local" },
            writeConcern: { w: "majority" }
        };

        const { name, password, is_active, websites, created_by, created_at, namespace } = values;

        const app_id = new mongoose.Types.ObjectId();  // db document / row (jwt_access_token: _id) 

        let app: any;

        await session.withTransaction(async () => {
            app = await new AppModel({ _id: app_id, name, password, is_active, created_by, created_at }); // changing
            app.websites = websites?.map(({ address }: { address: string }) => ({ address }));
            await app.save();

            await Namespace.insertMany(
                namespace.map(({ name, path, is_active }: { name: string, path: string, is_active: boolean }) => ({
                    name,
                    path,
                    is_active,
                    app_id: app_id,
                }))
            );
        });

        session ? session.endSession() : null;
        return { data: app.toObject(), code: HttpStatusCode.OK, status: true, msg: ['Successfully created the app'], errors: null };
    } catch (error: any) {
        session ? session.endSession() : null;
        console.error(error);
        const customErrors = await convertMongoErrorToCustomError(error);
        return { data: null, code: HttpStatusCode.InternalServerError, status: false, msg: ['Failed to create the app'], errors: customErrors };
    }
};


// const updateAppById = async (id: string, values: Record<string, any>): Promise<any> => await AppModel.findByIdAndUpdate(id, values)
const updateAppById = async (_id: string, values: Record<string, any>): Promise<any> => {
    let session: ClientSession | null = null;

    try {
        session = await mongoose.startSession();
        const transactionOptions: any = {
            readPreferences: "primary",
            readConcern: { level: "local" },
            writeConcern: { w: "majority" }
        };

        let app: any;

        await session.withTransaction(async () => {
            app = await AppModel.findById(_id);

            app.name = values.name;
            app.is_active = values.is_active;
            app.updated_by = values.updated_by;
            app.updated_at = values.updated_at;

            // Update websites
            // Create a new array with updated deleted_at field
            const websites_existing = app.websites.map((item: any) => ({
                ...item,
                deleted_at: new Date(),
            }));

            let new_websites = values.websites?.map((item: any) => ({ ...item, address: item?.address }));

            app.websites = [...websites_existing, ...new_websites];

            // Save the updated app document
            await app.save();

            // Namespace
            // Set deleted_at for existing namespaces
            await Namespace.updateMany(
                { app_id: _id, deleted_at: null },
                { $set: { deleted_at: new Date().toISOString() } }
            );
            await Namespace.insertMany(
                values.namespace.map(({ name, path, is_active }: { name: string, path: string, is_active: boolean }) => ({
                    name,
                    path,
                    is_active,
                    app_id: _id,
                }))
            );
        });

        session ? session.endSession() : null;
        return { data: app.toObject(), code: HttpStatusCode.OK, status: true, msg: ['Successfully updated the app'], errors: null };
    } catch (error: any) {
        session ? session.endSession() : null;
        console.error(error);
        const customErrors = await convertMongoErrorToCustomError(error);
        return { data: null, code: HttpStatusCode.InternalServerError, status: false, msg: ['Failed to update the app'], errors: customErrors };
    }
}


const getAllAllowedSites = async (): Promise<any> => {
    return AppModel.aggregate([
        {
            $unwind: '$websites' // Unwind the 'websites' array to create a separate document for each website
        },
        {
            $replaceRoot: { newRoot: '$websites' } // Replace the root with the 'websites' subdocument
        },
        {
            $match: { 'is_active': 1 } // Optionally, add a match stage for additional conditions
        },
        {
            $project: {
                _id: 0, // Exclude the _id field
                address: '$address' // Include only the 'address' field
            }
        }
    ])
        .then((websites: any) => {
            return websites?.map((item: any) => item?.address);
        });
};

export const appService = {
    getAppsPaginated,
    getAppByName,
    getAppById,
    createApp,
    updateAppById,
    getAllAllowedSites
}