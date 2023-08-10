const { body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const validationrules = require('../../helpers/validationrules')


exports.createRoleValidation = [
    body('role', 'Role is required').not().isEmpty().trim().escape(),
    body('permissions', 'Permission is required').not().isEmpty(),
    body('permissions', 'Permission must be an array').isArray(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.unique('roles', 'role', req?.body?.role)) {
            return set_response(res, null, 422, 'failed', ['Duplicate role already exists'])
        }

        next()
    }
]

exports.updateRoleValidation = [
    body('id', 'Role id is required').notEmpty(),
    body('id', 'Role id is must be numeric').isNumeric(),
    body('role', 'Role is required').not().isEmpty().trim().escape(),
    body('permissions', 'Permission is required').not().isEmpty(),
    body('permissions', 'Permission must be an array').isArray(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('roles', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        if (! await  validationrules.unique('roles', 'role', req?.body?.role, 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Duplicate role already exists'])
        }

        next()
    }
]



exports.getRoleValidation = [
    body('id', 'Role id is required').notEmpty(),
    body('id', 'Role id is must be numeric').isNumeric(),

    async (req, res, next) => {
        
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('roles', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]


exports.deleteRoleValidation = [
    body('id', 'Role id is required').notEmpty(),
    body('id', 'Role id is must be numeric').isNumeric(),

    async (req, res, next) => {
        
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('roles', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]


