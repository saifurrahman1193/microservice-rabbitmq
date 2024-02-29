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
    websites: [
        { type: 'array', required: true, message: 'Websites are required' },
        {
            type: 'array',
            validator(rule: any, value: any, callback: (errors?: string[]) => void) {
                const errors: string[] = [];

                if (!Array.isArray(value)) {
                    errors.push('Websites must be an array of objects');
                    callback(errors);
                    return;
                }

                for (let i = 0; i < value.length; i++) {
                    const website = value[i];

                    if (typeof website !== 'object' || !website.address) {
                        errors.push(`website ${i+1}: address is required`);
                    }
                }

                callback(errors);
            },
        },
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
        return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, messages, errors.errors);
    }
};
