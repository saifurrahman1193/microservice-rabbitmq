const { header, body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const jwt = require('jsonwebtoken');
const { sqlResult } = require('../../helpers/sqlhelpers');
const moment = require('moment');
const { now } = require('../../helpers/datehelpers');

exports.authMiddlware = [
    header('authorization', 'Authorization is required').notEmpty().trim(),
    async (req, res, next) => {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        formData = {
            "authorization": req.headers.authorization || ('Bearer ' + req.body.access_token),
        };

        const access_token = formData.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

            var access_token_row_db = []
            var user_data_db = []
            if (decoded) {
                access_token_row_db = await sqlResult(`
                                        SELECT * 
                                        FROM access_tokens 
                                        WHERE  token="${access_token}" AND user_id=${decoded.id} AND status=1
                                        AND expires_at>'${now}'
                                    `)
                user_data_db = await sqlResult(`
                    SELECT * 
                    FROM users 
                    WHERE  id=${decoded.id} 
                    AND status=1
                    LIMIT 1
                `)

                prev_access_tokens_expiring = await sqlResult(`
                                UPDATE access_tokens 
                                SET status=0
                                WHERE user_id=${decoded.id} AND status=1
                                AND expires_at<='${now}'
                            `)
            }

            if (decoded.id && access_token_row_db.length && user_data_db.length) {
                next()
            } else {
                return set_response(res, null, 401, 'failed', ['Unauthenticated'])
            }
        } catch (error) {
            return set_response(res, null, 401, 'failed', [error.message])
        }

    },
];