import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/APIResponser';
import { HttpStatusCode } from '../../helper/HttpCodeHelper';
import UniqueRule from '../../rule/common/UniqueRule';
import { App as AppModel } from '../../model/app/App';

const descriptor = <any>{
    name: [
        { type: 'string', required: true, message: 'App Name is required' },
        { min: 3, message: 'App Name must be at least 3 characters long' },
        { max: 50, message: 'App Name cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'App Name cannot contain spaces' },
        { pattern: /^[a-zA-Z0-9\s]*$/, message: 'App Name cannot contain special characters' },
        { asyncValidator: (rule: any, value: any, callback: any, model: any) => UniqueRule(rule, value, callback, AppModel), message: 'App Name is already exist.' }
    ],
    namespace_path: [
        { type: 'string', required: true, message: 'Name Space Path is required' },
        { min: 3, message: 'Name Space Path must be at least 3 characters long' },
        { max: 50, message: 'Name Space Path cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'Name Space Path cannot contain spaces' },
        { asyncValidator: (rule: any, value: any, callback: any, model: any) => UniqueRule(rule, value, callback, AppModel), message: 'Name Space Path is already exist.' }
    ],

};

export const CreateAppValidation = async (req: Request, res: Response, next: NextFunction) => {
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
        return set_response(res, null, HttpStatusCode.UnprocessableEntity, 'error', messages, errors.errors);
    }
};
