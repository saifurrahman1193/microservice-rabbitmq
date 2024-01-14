import { IApp, App } from '../../model/app/app.model';

const getApps = async (): Promise<IApp[]> => await App.find();
const getAppByName = async (name: string): Promise<IApp | null> => await App.findOne({ name });
const getAppById = async (_id: string): Promise<IApp | null> => await App.findOne({ _id });
const createApp = async (values: Record<string, any>): Promise<IApp> => await new App(values).save().then((item) => item.toObject());
const updateAppById = async (id: string, values: Record<string, any>): Promise<IApp | null> => await App.findByIdAndUpdate(id, values)

export const appService = {
    getApps,
    getAppByName,
    getAppById,
    createApp,
    updateAppById,
}