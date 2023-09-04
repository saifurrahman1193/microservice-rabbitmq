import { body, validationResult } from 'express-validator';
import { set_response } from '../../helpers/APIResponser.js';

export const createMeeetingValidation = [
    
    body('title', 'Title is required').not().notEmpty().trim().escape(),
    body('description', 'Description is required').not().notEmpty().trim().escape(),
    body('location', 'Location is required').not().notEmpty().trim().escape(),
    body('start_time', 'Meeting Start Time is required').notEmpty(),
    body('end_time', 'Meeting End Time is required').notEmpty(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }
        next()
    }
]


