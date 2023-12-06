// src/validation.ts
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../helper/APIResponser';

// Joi validation schema for login
export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

// Middleware function for login validation
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return set_response(res, null, 422, 'error', error.details.map(detail => detail.message), null)
    }

    // Attach the validated data to the request object for later use
    next();
};
