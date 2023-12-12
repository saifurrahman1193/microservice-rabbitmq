import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../helper/APIResponser';
import { HttpStatusCode } from '../helper/HttpCodeHelper';

const descriptor = <any>{
    username: {
        type: 'string',
        required: true,
        message: 'Username is required',
    },
    password: {
        type: 'string',
        required: true,
        message: 'Password is required',
    },
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
