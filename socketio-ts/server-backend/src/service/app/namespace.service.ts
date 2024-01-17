import { AppModel } from '../../model/app/app.model';
import { Namespace } from '../../model/app/namespace.model';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import mongoose, { ClientSession } from 'mongoose';
import { Request } from 'express';

const getNamespacePaginated = async (req: Request): Promise<any> => {
    return await Namespace.find()
        .lean()
        .populate('app') // Assuming 'posts' is the name of the field in the User schema referencing the Post model
        .exec();
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
                app: app._id,
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

export const namespaceService = {
    getNamespacePaginated,
    getAppByName,
    getAppById,
    createApp,
    updateAppById,
}