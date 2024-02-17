import { Schema, model, Document, Types } from 'mongoose';

enum IsReadEnum {
    IsRead = 1,
    NotReadYet = 0,
}


interface IMessage extends Document {
    name: string;

    app_id: Types.ObjectId;
    namespace_id: Types.ObjectId;
    group_chat_id?: Types.ObjectId;
    is_read?: IsReadEnum;
    
    created_by?: Types.ObjectId;
    created_at?: Date;
    read_at?: Date;
}

const MessageSchema = new Schema<IMessage>({
    name: { type: String, required: true },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model
    namespace_id: { type: Schema.Types.ObjectId, ref: 'Namespace' }, // Reference to App model
    is_read: {
        type: Number,
        enum: [IsReadEnum.IsRead, IsReadEnum.NotReadYet],
        default: IsReadEnum.NotReadYet,
    },

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
    read_at: { type: Date },
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
