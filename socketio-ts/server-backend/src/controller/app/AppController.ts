import { Request, Response } from 'express';
import { App as AppModel, createApp } from '../../model/app/App';
import { set_response } from '../../helper/APIResponser';
import { HttpStatusCode } from '../../helper/HttpCodeHelper';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, namespace_path, is_active } = req.body;

        const app = await createApp({
            name,
            namespace_path,
            is_active
        });

        return set_response(res, app, HttpStatusCode.OK, 'success', ['Successfully app created'], null);
    } catch (error) {
        return set_response(res, null, 500, 'error', ['Failed to create app'], null);
    }
};
