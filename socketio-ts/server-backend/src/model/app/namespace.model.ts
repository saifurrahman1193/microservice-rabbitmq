import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

interface INamespace extends Document {
    name: string;
    path: string;
    is_active: IsActiveEnum;
    app_id: Types.ObjectId;

    created_by?: Types.ObjectId;
    created_at?: Date;
    deleted_by?: Types.ObjectId;
    deleted_at?: Date;
}

const NamespaceSchema = new Schema<INamespace>({
    name: { type: String, required: true },
    path: { type: String, required: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
    deleted_by: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted_at: { type: Date, required: false },
});


// Add a virtual property to the AppSchema
NamespaceSchema.virtual('app', {
    type: 'ObjectId',
    ref: 'AppModel',
    foreignField: '_id',
    localField: 'app_id',
    justOne: true
});


const Namespace = model<INamespace>('Namespace', NamespaceSchema, 'namespace');

export { INamespace, Namespace };
