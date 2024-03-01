import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { AppModel } from '../../model/app/app.model';
import { unique } from '../../rule/common/unique.rule';
import { appService } from '../../service/app/app.service';

let globalReq: any;

const descriptor = <any>{
    name: [
        { type: 'string', required: true, message: 'App Name is required' },
        { min: 3, message: 'App Name must be at least 3 characters long' },
        { max: 50, message: 'App Name cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'App Name cannot contain spaces' },
        { pattern: /^[a-zA-Z0-9\s]*$/, message: 'App Name cannot contain special characters' },
        {
            async validator(rule: any, value: any, callback: (errors?: string[]) => void) {
                const errors: string[] = [];

                let validator = await unique({ 'model': AppModel, 'field': 'name', 'value': value, 'exceptField': '_id', 'exceptValue': globalReq.params.id, 'message': 'App name must be unique!' });
                validator.fails ? errors.push(validator.messages[0]) : null;
                callback(errors);
            },
        },
    ],
};



export const UpdateAppValidation = async (req: Request, res: Response, next: NextFunction) => {
    globalReq = req;
    const validator = new Schema(descriptor);
    try {
        await validator.validate({ ...req.body });
        next();
    } catch (errors: any) {
        const messages = errors.errors.map((error: any) => {
            if (error instanceof Error) {
                return error.message;
            } else if (error.message) {
                return error.message;
            } else {
                return 'Validation error';
            }
        });
        return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, messages, errors.errors);
    }
};
