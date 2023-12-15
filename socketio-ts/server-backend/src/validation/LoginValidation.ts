import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../helper/APIResponser';
import { HttpStatusCode } from '../helper/HttpCodeHelper';
import validateAgainstCommonPasswordsRule from '../rule/ValidateAgainstCommonPasswordsRule';

const descriptor = <any>{
    username: {
        type: 'string',
        required: true,
        message: 'Username is required',
    },
    password: [
        { type: 'string', required: true, message: 'Password is required' },
        { min: 8, message: 'Password must be at least 8 characters long' },
        { max: 50, message: 'Password cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'Password cannot contain spaces' },
        { validator: validateAgainstCommonPasswordsRule, message: 'Avoid using common passwords' }
    ],
};


export const LoginValidation = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new Schema(descriptor);
    validator.validate({ ...req.body }, (errors: any) => {
        if (errors) {
            let messages = errors?.map((error: any) => error?.message)
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, 'error', messages, errors);
        }
        next();
    });
};
