import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}


interface IGroupChat extends Document {
    name: string;

    is_active: IsActiveEnum;
    app_id: Types.ObjectId;
    namespace_id: Types.ObjectId;

    created_by?: Types.ObjectId;
    created_at?: Date;
}

const GroupChatSchema = new Schema<IGroupChat>({
    name: { type: String, required: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model
    namespace_id: { type: Schema.Types.ObjectId, ref: 'Namespace' }, // Reference to App model

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Add a virtual property to the AppSchema
GroupChatSchema.virtual('app', {
    type: 'ObjectId',
    ref: 'AppModel',
    foreignField: '_id',
    localField: 'app_id',
    justOne: true
});

GroupChatSchema.virtual('namespace', {
    type: 'ObjectId',
    ref: 'Namespace',
    foreignField: '_id',
    localField: 'namespace_id',
    justOne : true
});


const GroupChat = model<IGroupChat>('GroupChat', GroupChatSchema, 'group_chat');

export { IGroupChat, GroupChat };
