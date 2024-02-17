import { Schema, model, Document, Types } from 'mongoose';

interface IMessage extends Document {
    name: string;

    app_id: Types.ObjectId;
    namespace_id: Types.ObjectId;

    created_by?: Types.ObjectId;
    created_at?: Date;
}

const MessageSchema = new Schema<IMessage>({
    name: { type: String, required: true },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model
    namespace_id: { type: Schema.Types.ObjectId, ref: 'Namespace' }, // Reference to App model

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Add a virtual property to the AppSchema
MessageSchema.virtual('app', {
    type: 'ObjectId',
    ref: 'AppModel',
    foreignField: '_id',
    localField: 'app_id',
    justOne: true
});

MessageSchema.virtual('namespace', {
    type: 'ObjectId',
    ref: 'Namespace',
    foreignField: '_id',
    localField: 'namespace_id',
    justOne : true
});

const Message = model<IMessage>('Message', MessageSchema, 'message');

export { IMessage, Message };
