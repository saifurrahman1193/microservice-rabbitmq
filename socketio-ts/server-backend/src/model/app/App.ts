import { Schema, model } from 'mongoose';
enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}
interface IApp {
    name: string;
    password: string;
    namespace_path: string;
    is_active: IsActiveEnum;
    created_by: string;
    created_at: Date;
}
const AppSchema = new Schema<IApp>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    namespace_path: { type: String, required: true },
    is_active: { type: Number, enum: [IsActiveEnum.Inactive, IsActiveEnum.Active], default: IsActiveEnum.Active },
    created_by: { type: String },
    created_at: { type: Date },
});

export const App = model('App', AppSchema, 'app');

export const getApps = async (): Promise<IApp[]> => await App.find();
export const getAppByName = async (name: string): Promise<IApp | null> => await App.findOne({ name });
export const getAppById = async (_id: string): Promise<IApp | null> => await App.findOne({ _id });
export const createApp = async (values: Record<string, any>): Promise<IApp> => await new App(values).save().then((item) => item.toObject());
export const updateAppById = async (id: string, values: Record<string, any>): Promise<IApp | null> => await App.findByIdAndUpdate(id, values)

