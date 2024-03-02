import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import ValidateAgainstCommonPasswordsRule from '../../rule/authentication/validateagainstcommonpasswords.rule';
import { unique } from '../../rule/common/unique.rule';
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
        {
            async validator(rule: any, value: any, callback: (errors?: string[]) => void) {
                const errors: string[] = [];

                let validator = await unique({ 'model': User, 'field': 'username', value, 'message': 'Username must be unique!' });
                validator.fails ? errors.push(validator.messages[0]) : null;
                callback(errors);
            },
        },
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
        return set_response(res, null, HttpStatusCode.UnprocessableEntity,  false , messages, errors.errors);
    }
};
