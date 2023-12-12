import { Response } from 'express';

interface ErrorResponse {
    message: string;
    field: string;
}

export const set_response = (res: Response, data: any, code: number, status: string, msg: string[], errors: ErrorResponse[] | null) => {
    return res.status(code || 200).json({
        status: status,
        code: code,
        data: data,
        message: msg,
        errors: errors
    }).end();
};

