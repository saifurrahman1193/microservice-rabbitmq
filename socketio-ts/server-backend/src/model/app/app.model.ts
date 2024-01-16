import { Schema, model, Document, Types } from 'mongoose';

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
    is_active: IsActiveEnum;
    created_by?: number;
    created_at?: Date;
    // namespace: Types.ObjectId[]; // Reference to Namespace model
}

const AppSchema = new Schema<IApp>({
    name: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
    },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    created_by: { type: String },
    created_at: { type: Date },
    // namespace: [{ type: Schema.Types.ObjectId, ref: 'Namespace' }] // Reference to Namespace model
});

const AppModel = model<IApp>('AppModel', AppSchema, 'app');

export { IApp, AppModel };
