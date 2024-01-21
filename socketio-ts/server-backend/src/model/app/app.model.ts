import { Schema, model, Document, Types } from 'mongoose';
import { INamespace } from './namespace.model';

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
    created_by?: Types.ObjectId;
    created_at?: Date;
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
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Add a virtual property to the AppSchema
AppSchema.virtual('namespace', {
    type: 'ObjectId',
    ref: 'Namespace',
    localField: '_id',
    foreignField: 'app_id',
});


const AppModel = model<IApp>('AppModel', AppSchema, 'app');

export { IApp, AppModel };
