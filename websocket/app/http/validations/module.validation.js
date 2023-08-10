const { body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const validationrules = require('../../helpers/validationrules')


exports.createModuleValidation = [
    body('name', 'Module name is required').not().isEmpty().trim().escape(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.unique('permission_modules', 'name', req?.body?.permission)) {
            return set_response(res, null, 422, 'failed', ['Duplicate module already exist!'])
        }

        next()
    }
]

exports.updateModuleValidation = [
    body('id', 'Module id is required').notEmpty(),
    body('id', 'Module id is must be numeric').isNumeric(),
    body('name', 'Module name is required').notEmpty(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('permission_modules', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        if (! await  validationrules.unique('permission_modules', 'name', req?.body?.name, 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Duplicate module already exist!'])
        }

        next()
    }
]


exports.getModuleValidation = [
    body('id', 'Module id is required').notEmpty(),
    body('id', 'Module id is must be numeric').isNumeric(),

    async (req, res, next) => {
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('permission_modules', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]
