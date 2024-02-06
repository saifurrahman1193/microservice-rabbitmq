import { Request, Response } from 'express';
import { namespaceService } from '../../service/app/namespace.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { userService } from '../../service/authentication/user.service';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';


export const create = async (req: Request, res: Response) => {
    try {
        const { name, is_active } = req.body;

        const me = await userService.getMyInfo(req);

        // // Create/register a new app
        // const salt = random();
        // const password = generateAccessToken(60); // generate a 60 char auto password
        // const app = await appService.createApp({
        //     name,
        //     authentication: {
        //         salt,
        //         password: authentication(salt, password) // make sure the password is hashed
        //     },
        //     is_active,
        //     created_by: me ? me?.username : null,
        //     created_at: new Date().toISOString(),
        // });

        return set_response(res, me, HttpStatusCode.OK, true, ['Successfully created the namespace'], null);
    } catch (error: any) {
        const customErrors = await convertMongoErrorToCustomError(error);
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Failed to create the namespace'], customErrors);
    }
};

export const getAllPaginated = async (req: Request, res: Response) => {
    try {
        let formData = { ...req?.query, ...req?.body }

        // const data = await paginate(req, formData, NamespaceModel);
        const data = await namespaceService.getNamespacePaginated(req);
        console.log(data);
        console.log(data.namespace);
        

        return set_response(res, data, HttpStatusCode.OK, true, ['Namespace list'], null);
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
};

