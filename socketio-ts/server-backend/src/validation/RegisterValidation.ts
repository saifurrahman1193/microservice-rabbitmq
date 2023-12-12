// src/validation.ts
import { Request, Response, NextFunction } from 'express';
import { set_response } from '../helper/APIResponser';

// Joi validation schema for register
// export const registerSchema = Joi.object({
//     username: Joi.string().required().messages({
//         'any.required': 'Username is required',
//     }),
//     password: Joi.string().min(8).required().messages({
//         'string.min': 'Password must be at least 8 characters long',
//         'any.required': 'Password is required',
//     }),
// });

// Middleware function for register validation
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // const { error, value } = registerSchema.validate(req.body);

    // if (error) {
    //     return set_response(res, null, 422, 'error', error.details.map(detail => detail.message), null)
    // }

    // Attach the validated data to the request object for later use
    next();
};
