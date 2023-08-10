const { body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const validationrules = require('../../helpers/validationrules')


exports.createUserValidation = [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Email is required').not().isEmpty().trim().escape(),
    body('email', 'Email must be an email').isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('password', 'Password length min 8 characters').isLength({ min: 8 }),
    body('roles', 'Role is required').not().isEmpty(),
    body('roles', 'Role must be an array').isArray(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.unique('users', 'email', req?.body?.email)) {
            return set_response(res, null, 422, 'failed', ['Duplicate email already exists'])
        }

        next()
    }
]

exports.updateUserValidation = [
    body('id', 'User id is required').notEmpty(),
    body('id', 'User id is must be numeric').isNumeric(),
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Email is required').not().isEmpty().trim().escape(),
    body('email', 'Email must be an email').isEmail(),
    body('roles', 'Role is required').not().isEmpty(),
    body('roles', 'Role must be an array').isArray(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('users', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        if (! await  validationrules.unique('users', 'email', req?.body?.email, 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Duplicate email already exists'])
        }

        next()
    }
]


exports.userStatusValidation = [
    body('user_id', 'User id is required').notEmpty(),
    body('user_id', 'User id is must be numeric').isNumeric(),
    body('status', 'Status is required').notEmpty(),
    body('status', 'Status is must be numeric').isNumeric(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('users', 'id', req?.body?.user_id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }

        next()
    }
]


exports.getUserValidation = [
    body('id', 'User id is required').notEmpty(),
    body('id', 'User id is must be numeric').isNumeric(),

    async (req, res, next) => {
        
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('users', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]
