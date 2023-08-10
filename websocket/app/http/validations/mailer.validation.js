const { body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const validationrules = require('../../helpers/validationrules')


const sendMailValidation = exports.sendMailValidation = [
    body('from', 'From is required').not().isEmpty().trim().escape(),
    body('to', 'To is required').not().isEmpty().trim().escape(),
    body('subject', 'Subject is required').not().isEmpty().trim().escape(),
    body('mailReceiverName', 'Mail Receiver Name is required').not().isEmpty().trim().escape(),
    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        next()
    }
]
