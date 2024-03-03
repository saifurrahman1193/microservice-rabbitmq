import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { appService } from '../../service/app/app.service';
import { AppModel } from '../../model/app/app.model';
import unique from '../../rule/common/unique.rule';
import { namespaceService } from '../../service/app/namespace.service';


const descriptor = (req: Request): any => (
    {
        name: [
            { type: 'string', required: true, message: 'App Name is required' },
            { min: 3, message: 'App Name must be at least 3 characters long' },
            { max: 50, message: 'App Name cannot exceed 50 characters' },
            { pattern: /^\S*$/, message: 'App Name cannot contain spaces' },
            { pattern: /^[a-zA-Z0-9\s]*$/, message: 'App Name cannot contain special characters' },
            { asyncValidator: unique, 'model': AppModel, 'field': 'name', 'message': `App name must be unique!` }
        ],
        websites: [
            { type: 'array', required: true, message: 'Websites are required' },
            {
                async validator(rule: any, value: any, callback: (errors?: string[]) => void) {
                    const errors: string[] = [];

                    if (!Array.isArray(value)) {
                        errors.push('Websites must be an array of objects');
                        callback(errors);
                        return;
                    }

                    let all_allowed_websites_exists = await appService.getAllAllowedSites();
                    for (let i = 0; i < value.length; i++) {
                        const website = value[i];

                        if (typeof website !== 'object' || !website.address) { // if we don't have an address
                            errors.push(`website ${i + 1}: address is required`);
                        }
                        let address = website.address
                        if (all_allowed_websites_exists.includes(address)) {
                            errors.push(`website ${i + 1}: address is already exist`);
                        }
                    }

                    callback(errors);
                },
            },
        ],
        namespaces: [
            { type: 'array', required: true, message: 'Namespaces are required' },
            {
                async validator(rule: any, value: any, callback: (errors?: string[]) => void) {
                    const errors: string[] = [];

                    if (!Array.isArray(value)) {
                        errors.push('Namespace must be an array of objects');
                        callback(errors);
                        return;
                    }

                    let all_namespaces_exists = await namespaceService.getNamespaceNames();
                    for (let i = 0; i < value.length; i++) {
                        const namespace = value[i];

                        if (typeof namespace !== 'object' || !namespace.name) { // if we don't have an name
                            errors.push(`namespace ${i + 1}: name is required`);
                        }
                        let name = namespace.name
                        if (all_namespaces_exists.includes(name)) {
                            errors.push(`namespace ${i + 1}: name is already exist`);
                        }
                    }

                    callback(errors);
                },
            },
        ],
    }
);


export const CreateAppValidation = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new Schema(descriptor(req));

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
