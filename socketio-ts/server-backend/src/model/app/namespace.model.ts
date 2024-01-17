import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

interface INamespace extends Document {
    name: string;
    path: string;
    is_active: IsActiveEnum;
    created_by?: number;
    created_at?: Date;
    app_id?: Types.ObjectId;
}

const NamespaceSchema = new Schema<INamespace>({
    name: { type: String, required: true, unique: true },
    path: { type: String, required: true, unique: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    created_by: { type: String },
    created_at: { type: Date },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model
});

// Add a virtual property to the AppSchema
NamespaceSchema.virtual('app', {
    type: 'ObjectId',
    ref: 'AppModel',
    foreignField: '_id',
    localField: 'app_id',
    justOne : true
});


const Namespace = model<INamespace>('Namespace', NamespaceSchema, 'namespace');

export { INamespace, Namespace };
