import { body, validationResult } from 'express-validator';
import { set_response } from '../../helpers/APIResponser.js';
import checkTimeDifference from '../rule/checkTimeDifference.js';

export const createMeeetingValidation = [

    body('title', 'Title is required').not().notEmpty().trim().escape(),
    body('description', 'Description is required').not().notEmpty().trim().escape(),
    body('location', 'Location is required').not().notEmpty().trim().escape(),
    body('start_time', 'Meeting Start Time is required').notEmpty(),
    body('end_time', 'Meeting End Time is required').notEmpty(),
    body('start_time')
        .custom((value, { req }) => {
            // Check the time difference using the custom function
            return checkTimeDifference(req.body.start_time, req.body.end_time, 30*60*1000, 60*60*1000, 'Meeting duration should be between 30 minutes and 1 hour.');
        }),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg), errors.array())
        }
        next()
    }
]



export const updateMeeetingValidation = [

    body('title', 'Title is required').not().notEmpty().trim().escape(),
    body('description', 'Description is required').not().notEmpty().trim().escape(),
    body('location', 'Location is required').not().notEmpty().trim().escape(),
    body('start_time', 'Meeting Start Time is required').notEmpty(),
    body('end_time', 'Meeting End Time is required').notEmpty(),
    body('start_time')
        .custom((value, { req }) => {
            // Check the time difference using the custom function
            return checkTimeDifference(req.body.start_time, req.body.end_time, 30*60*1000, 60*60*1000, 'Meeting duration should be between 30 minutes and 1 hour.');
        }),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg), errors.array())
        }
        next()
    }
]