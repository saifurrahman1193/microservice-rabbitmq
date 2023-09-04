import { body, validationResult } from 'express-validator';
import { set_response } from '../../helpers/APIResponser.js';

export const createMeeetingValidation = [
    
    body('data.title', 'Title is required').not().notEmpty().trim().escape(),
    body('data.description', 'Description is required').not().notEmpty().trim().escape(),
    body('data.location', 'Location is required').not().notEmpty().trim().escape(),
    body('data.start_time', 'Meeting Start Time is required').notEmpty(),
    body('data.end_time', 'Meeting End Time is required').notEmpty(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }
        next()
    }
]


