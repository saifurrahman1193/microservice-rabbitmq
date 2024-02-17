import { AppModel } from '../../model/app/app.model';
import { SocketUser } from '../../model/app/socketuser.model';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import mongoose, { ClientSession } from 'mongoose';
import { Request } from 'express';

// const getNamespacePaginated = async (req: Request): Promise<any> => {
//     return await Namespace.find()
//         .lean()
//         .populate('app') // Assuming 'posts' is the name of the field in the User schema referencing the Post model
//         .exec();
// };

// const checkExistanceNamespaceByPath = async (path: any): Promise<any> => {
//     console.log(path);

//     return await Namespace.exists({ path: path })
// };

// const checkExistanceValidNamespace = async (path: any, queryParams: any): Promise<any> => {
//     const namespaceDoc: any = await Namespace.findOne({
//         path: path,
//         app_id: queryParams?.app_id,
//     })
//     .lean()
//     .populate('app');

//     return namespaceDoc && namespaceDoc?.app?.password == queryParams?.app_password;
// };

// const getAppByName = async (name: string): Promise<any> => await AppModel.findOne({ name });
// const getAppById = async (_id: string): Promise<any> => await AppModel.findOne({ _id });

const createSocketUser = async (values: Record<string, any>): Promise<any> => {
    let session: ClientSession | null = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { user_id, socket_id, username, app_id, namespace_id, is_active, created_by } = values;

        const socketuser = await new SocketUser({ 
            user_id, socket_id, username, app_id, namespace_id, is_active, created_by
         }, { session });

        await socketuser.save();

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return {
            data: socketuser.toObject(),
            code: HttpStatusCode.OK,
            status: true,
            msg: ['Successfully created the socket user'],
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
            msg: ['Failed to create the socket user'],
            errors: customErrors,
        };
    }
};

const updateSocketUser = async (values: Record<string, any>): Promise<any> => {
    await SocketUser.findOneAndUpdate({socket_id:values?.socket_id}, values)
};


// const updateAppById = async (id: string, values: Record<string, any>): Promise<any> => await AppModel.findByIdAndUpdate(id, values)

export const socketuserService = {
    createSocketUser,
    updateSocketUser,
}