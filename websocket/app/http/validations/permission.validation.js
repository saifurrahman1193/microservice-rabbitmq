const { body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const validationrules = require('../../helpers/validationrules')


exports.createPermissionValidation = [
    body('permission', 'Permission is required').not().isEmpty().trim().escape(),
    body('module', 'Module is required').notEmpty(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.unique('permissions', 'permission', req?.body?.permission)) {
            return set_response(res, null, 422, 'failed', ['Duplicate permission already exist!'])
        }

        next()
    }
]

exports.updatePermissionValidation = [
    body('id', 'Permission id is required').notEmpty(),
    body('id', 'Permission id is must be numeric').isNumeric(),
    body('permission', 'Permission is required').not().isEmpty().trim().escape(),
    body('module', 'Module is required').notEmpty(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('permissions', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }

        if (! await  validationrules.unique('permissions', 'permission', req?.body?.permission, 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Duplicate permission already exist!'])
        }


        if (! await  validationrules.exists('permission_modules', 'name', req?.body?.module)) {
            return set_response(res, null, 422, 'failed', ['Invalid module'])
        }

        next()
    }
]


exports.getPermissionValidation = [
    body('id', 'Permission id is required').notEmpty(),
    body('id', 'Permission id is must be numeric').isNumeric(),

    async (req, res, next) => {
        
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('permissions', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]
