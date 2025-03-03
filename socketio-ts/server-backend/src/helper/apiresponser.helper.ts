import { Response } from 'express';
import { HttpStatusCode } from './httpcode.helper';

interface ErrorResponse {
    message: string;
    field: string;
}

export const set_response = (res: Response, data: any, code: number, status: boolean, msg: string[], errors: any) => {
    return res.status(code || HttpStatusCode.OK).json({
        status: status,
        code: code,
        data: data,
        message: msg,
        errors: errors
    }).end();
};

