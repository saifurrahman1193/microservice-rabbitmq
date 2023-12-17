import { Response } from 'express';
import { HttpStatusCode } from './httpcode.helper';

interface ErrorResponse {
    message: string;
    field: string;
}

export const set_response = (res: Response, data: any, code: number, status: string, msg: string[], errors: ErrorResponse[] | null) => {
    return res.status(code || HttpStatusCode.OK).json({
        status: status,
        code: code,
        data: data,
        message: msg,
        errors: errors
    }).end();
};

