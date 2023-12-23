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
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    namespace_path: { type: String, required: true, unique: true},
    is_active: { type: Number, enum: [IsActiveEnum.Inactive, IsActiveEnum.Active], default: IsActiveEnum.Active },
    created_by: { type: String },
    created_at: { type: Date },
});

const App = model('App', AppSchema, 'app');

export {
    IApp, App
}


