import { Schema, model, Document } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

interface INamespace extends Document {
    path: string;
    is_active: IsActiveEnum;
    created_by?: string;
    created_at?: Date;
}

const NamespaceSchema = new Schema<INamespace>({
    path: { type: String, required: true, unique: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    app: { type: Schema.Types.ObjectId, ref: 'App' }, // Reference to App model
    created_by: { type: String },
    created_at: { type: Date },
});

const Namespace = model<INamespace>('Namespace', NamespaceSchema, 'namespace');

export { INamespace, Namespace };
