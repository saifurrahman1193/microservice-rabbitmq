import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

// Define the user interface
interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
    avatar?: string;
    is_active: IsActiveEnum;
    created_by?: Types.ObjectId;
    created_at?: Date;
}

// Define the user schema
const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, required: false }, // Assuming avatar is required, adjust as needed
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Define and export the user model
const User = model<IUser>('User', UserSchema, 'user');


export {
    User
};
