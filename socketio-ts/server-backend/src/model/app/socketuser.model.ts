import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

interface ISocketUser extends Document {
    user_id?: string;
    socket_id: string;
    username?: string;
    app_id?: Types.ObjectId;
    is_active: IsActiveEnum;

    created_by?: Types.ObjectId;
    created_at?: Date;
    updated_by?: Types.ObjectId;
    updated_at?: Date;
}

const SocketUserSchema = new Schema<ISocketUser>({
    user_id: { type: String, required: false},    // client = user_id
    socket_id: { type: String, required: true},  // server user_id = socket_id
    username: { type: String, required: false },    // client = user_name
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    updated_at: { type: Date, default: () => Date.now() },
});

// Add a virtual property to the SocketUserSchema
SocketUserSchema.virtual('app', {
    type: 'ObjectId',
    ref: 'AppModel',
    foreignField: '_id',
    localField: 'app_id',
    justOne : true
});

const SocketUser = model<ISocketUser>('SocketUser', SocketUserSchema, 'socket_user');

export { ISocketUser, SocketUser };
