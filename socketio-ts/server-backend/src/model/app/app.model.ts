import { Schema, model, Document } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

// Define the authentication interface
interface IAuthentication {
    salt: string;
    password: string;
}

interface IApp extends Document {
    name: string;
    authentication: IAuthentication;
    // namespace_path: string;
    is_active: IsActiveEnum;
    created_by?: string;
    created_at?: Date;
}

const AppSchema = new Schema<IApp>({
    name: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
    },
    // namespace_path: { type: String, required: true, unique: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    created_by: { type: String },
    created_at: { type: Date },
});

const App = model<IApp>('App', AppSchema, 'app');

export { IApp, App };
