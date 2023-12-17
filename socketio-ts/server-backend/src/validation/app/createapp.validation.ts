import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';

const descriptor = <any>{
    name: [
        { type: 'string', required: true, message: 'App Name is required' },
        { min: 3, message: 'App Name must be at least 3 characters long' },
        { max: 50, message: 'App Name cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'App Name cannot contain spaces' },
        { pattern: /^[a-zA-Z0-9\s]*$/, message: 'App Name cannot contain special characters' },
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
