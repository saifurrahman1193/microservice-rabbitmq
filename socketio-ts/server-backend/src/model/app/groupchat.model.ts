import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

interface IAdmin extends Document {
    user_id: Types.ObjectId; 
    is_active: IsActiveEnum;

    created_by?: Types.ObjectId;
    created_at?: Date;
}

interface IGroupChat extends Document {
    name: string;
    admins: IAdmin[]; 
    admins_history: IAdmin[]; 
    users: IAdmin[]; 
    users_history: IAdmin[]; 

    is_active: IsActiveEnum;
    app_id?: Types.ObjectId;

    created_by?: Types.ObjectId;
    created_at?: Date;
}



const GroupChatSchema = new Schema<IGroupChat>({
    name: { type: String, required: true },
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Updated type to Schema.Types.ObjectId
    admins_history: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Updated type to Schema.Types.ObjectId
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Updated type to Schema.Types.ObjectId
    users_history: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Updated type to Schema.Types.ObjectId

    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model

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


const GroupChat = model<IGroupChat>('GroupChat', GroupChatSchema, 'groupchat');

export { IGroupChat, GroupChat };
