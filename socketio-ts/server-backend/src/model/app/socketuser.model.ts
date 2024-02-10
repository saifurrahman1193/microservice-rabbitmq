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
}

const SocketUserSchema = new Schema<ISocketUser>({
    user_id: { type: String, required: true},    
    socket_id: { type: String, required: true},    
    username: { type: String, required: false },
    app_id: { type: Schema.Types.ObjectId, ref: 'AppModel' }, // Reference to App model
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },

    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Add a virtual property to the SocketUserSchema
SocketUserSchema.virtual('app', {
    type: 'ObjectId',
    ref: 'AppModel',
    foreignField: '_id',
    localField: 'app_id',
    justOne : true
});

const SocketUser = model<ISocketUser>('SocketUser', SocketUserSchema, 'app');

export { ISocketUser, SocketUser };
