import { Request, Response } from 'express';
import { appService } from '../../service/app/app.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { generateRandomText } from '../../helper/crypto.helper';
import { userService } from '../../service/authentication/user.service';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';
import { unique } from '../../rule/common/unique.rule';
import { AppModel } from '../../model/app/app.model';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, is_active, namespaces, websites } = req.body;

        const me = await userService.getMyInfo(req);

        const namespaces_formatted = namespaces.map((item: any) => ({
            name: item?.name,
            path: '/'+item?.name,
            is_active: true,
        }));

        // Create a new app
        const password = await generateRandomText(60); // generate a 60 char auto password
        const result = await appService.createApp({
            name,
            password,
            is_active,
            namespace: namespaces_formatted,
            websites,
            created_by: me ? me?._id : null,
            created_at: new Date().toISOString(),
        });

        return set_response(res, result.data, result.code, result.status, result.msg, result.errors);
    } catch (error: any) {
        console.log(error);
        const customErrors = await convertMongoErrorToCustomError(error);
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Failed to create the app'], customErrors);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, is_active, namespaces, websites } = req.body;

        const app = await appService.getAppById(id);

        if (!app) {
            return set_response(res, null, HttpStatusCode.BadRequest, false, ['Bad Request: App not found!'], null);
        }

        // DB level validation
        let validator = await unique({ 'model': AppModel, 'field': 'name', 'value': name, 'exceptField': '_id', 'exceptValue': id });
        if (validator.fails) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, validator.messages, validator.errors);
        }

        const me = await userService.getMyInfo(req);
        

        const namespaces_formatted = namespaces.map((item: any) => ({
            name: item?.name,
            path: '/'+item?.name,
            is_active: true,
        }));

        // Create a new app
        const result = await appService.updateAppById(id, {
            name,
            is_active,
            namespace: namespaces_formatted,
            websites,

            update_by: me ? me?._id : null,
            update_at: new Date().toISOString(),
        });

        return set_response(res, result.data, result.code, result.status, result.msg, result.errors);
    } catch (error: any) {
        console.log(error);
        const customErrors = await convertMongoErrorToCustomError(error);
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Failed to create the app'], customErrors);
    }
};

export const getAllPaginated = async (req: Request, res: Response) => {
    try {

        const data = await appService.getAppsPaginated(req);
        // console.log(data);
        // console.log(data.namespace);
        

        return set_response(res, data, HttpStatusCode.OK, true, ['APP list'], null);
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
};

export const getSingle = async (req: Request, res: Response) => {
    try {
        const data = await appService.getAppById(req?.params?.id);

        return set_response(res, data, HttpStatusCode.OK, true, ['APP list'], null);
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
};
