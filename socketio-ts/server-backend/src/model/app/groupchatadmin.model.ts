import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}


interface IGroupChatAdmin extends Document {
    user_id: Types.ObjectId;
    group_chat_id: Types.ObjectId;
    is_active: IsActiveEnum;

    created_by?: Types.ObjectId;
    created_at?: Date;
}

const GroupChatAdminSchema = new Schema<IGroupChatAdmin>({
    user_id: { type: Schema.Types.ObjectId, required: true },
    group_chat_id: { type: Schema.Types.ObjectId, required: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Add a virtual property to the AppSchema
GroupChatAdminSchema.virtual('group_chat', {
    type: 'ObjectId',
    ref: 'GroupChat',
    foreignField: '_id',
    localField: 'group_chat_id',
    justOne: true
});


const GroupChatAdmin = model<IGroupChatAdmin>('GroupChatAdmin', GroupChatAdminSchema, 'group_chat_admin');

export { IGroupChatAdmin, GroupChatAdmin };
