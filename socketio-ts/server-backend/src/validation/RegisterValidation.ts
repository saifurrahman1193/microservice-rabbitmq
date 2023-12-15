import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../helper/APIResponser';
import { HttpStatusCode } from '../helper/HttpCodeHelper';
import ValidateAgainstCommonPasswordsRule from '../rule/ValidateAgainstCommonPasswordsRule';

const descriptor = <any> {
    name: [
        { type: 'string', required: true, message: 'Name is required' },
        { min: 4, message: 'Name must be at least 4 characters long' },
        { max: 50, message: 'Name cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'Name cannot contain spaces' },
    ],
    username: [
        { type: 'string', required: true, message: 'Username is required' },
        { min: 4, message: 'Username must be at least 4 characters long' },
        { max: 50, message: 'Username cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'Username cannot contain spaces' },
    ],
    password: [
        { type: 'string', required: true, message: 'Password is required' },
        { min: 8, message: 'Password must be at least 8 characters long' },
        { max: 50, message: 'Password cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'Password cannot contain spaces' },
        { validator: ValidateAgainstCommonPasswordsRule, message: 'Avoid using common passwords' }
    ],
};

export const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new Schema(descriptor);

    try {
        await validator.validate({ ...req.body });
        next();
    } catch (errors: any) {
        const messages = errors.map((error: any) => error?.message);
        return set_response(res, null, HttpStatusCode.UnprocessableEntity, 'error', messages, errors);
    }
};
