import Schema from 'async-validator';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { AppModel } from '../../model/app/app.model';
import unique from '../../rule/common/unique.rule';
import exists from '../../rule/common/exists.rule';
import { appService } from '../../service/app/app.service';
import { namespaceService } from '../../service/app/namespace.service';
import mongoose from 'mongoose';

const descriptor = (req: Request): any => (
    {
        name: [
            { type: 'string', required: true, message: 'App Name is required' },
            { min: 3, message: 'App Name must be at least 3 characters long' },
            { max: 50, message: 'App Name cannot exceed 50 characters' },
            { pattern: /^\S*$/, message: 'App Name cannot contain spaces' },
            { pattern: /^[a-zA-Z0-9\s]*$/, message: 'App Name cannot contain special characters' },
            { asyncValidator: exists, model: AppModel, fieldNameToOverride: '_id', fieldValueToOverride: new mongoose.Types.ObjectId(req.params.id), message: `App must exist!` },
            { asyncValidator: unique, model: AppModel, exceptField: '_id', exceptValue: new mongoose.Types.ObjectId(req.params.id), message: `App name must be unique!` }
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

                    let all_allowed_websites_exists = await appService.getAllAllowedSitesExceptSpecificApp(req.params.id);

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

                    let all_namespaces_exists = await namespaceService.getNamespaceNamesExceptSpecificApp(req.params.id);
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


export const UpdateAppValidation = async (req: Request, res: Response, next: NextFunction) => {
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
