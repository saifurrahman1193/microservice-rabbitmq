import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import ValidateAgainstCommonPasswordsRule from '../../rule/authentication/validateagainstcommonpasswords.rule';
import unique from '../../rule/common/unique.rule';
import { User } from '../../model/authentication/user.model';

const descriptor = <any>{
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
        { asyncValidator: unique, 'model': User, 'field': 'username', 'message': `Username must be unique!` },
    ],
    email: [
        { type: 'email', required: true, message: 'Email is required' },
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ivalid Email' },
        { asyncValidator: unique, 'model': User, 'field': 'email', 'message': `Email must be unique!` }
    ],
    password: [
        { type: 'string', required: true, message: 'Password is required' },
        { min: 8, message: 'Password must be at least 8 characters long' },
        { max: 50, message: 'Password cannot exceed 50 characters' },
        { pattern: /^\S*$/, message: 'Password cannot contain spaces' },
        { asyncValidator: ValidateAgainstCommonPasswordsRule, message: 'Avoid using common passwords' }
    ],
};

export const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
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
