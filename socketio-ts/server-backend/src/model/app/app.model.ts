import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

interface IWebsite extends Document {
    address: string;
    created_by?: Types.ObjectId;
    created_at?: Date;
    deleted_by?: Types.ObjectId;
    deleted_at?: Date;
}

interface IApp extends Document {
    name: string;
    password: string;
    is_active: IsActiveEnum;
    websites: IWebsite[];
    created_by?: Types.ObjectId;
    created_at?: Date;
}

const WebsiteSchema = new Schema<IWebsite>({
    address: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
    deleted_by: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted_at: { type: Date, required: false },
});

const AppSchema = new Schema<IApp>({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    websites: [WebsiteSchema],
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
