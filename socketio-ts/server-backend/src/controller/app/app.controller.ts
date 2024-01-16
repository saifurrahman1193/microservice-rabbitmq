import { Request, Response } from 'express';
import { appService } from '../../service/app/app.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { generateAccessToken } from '../../helper/crypto.helper';
import { userService } from '../../service/authentication/user.service';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';
import { unique } from '../../rule/common/unique.rule';
import { AppModel } from '../../model/app/app.model';
import { authentication, random } from '../../helper/auth.helper';
import { paginate } from '../../helper/pagination.helper';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, is_active, namespaces } = req.body;

        // DB level validation
        let validator = await unique({ 'model': AppModel, 'field': 'name', 'value': name });
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
        const salt = random();
        const password = generateAccessToken(60); // generate a 60 char auto password
        const result = await appService.createApp({
            name,
            authentication: {
                salt,
                password: authentication(salt, password) // make sure the password is hashed
            },
            is_active,
            created_by: me ? me?._id : null,
            created_at: new Date().toISOString(),
            namespace: namespaces_formatted
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
        let formData = { ...req?.query, ...req?.body }

        const data = await paginate(req, formData, AppModel);

        return set_response(res, data, HttpStatusCode.OK, true, ['APP list'], null);
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
};

