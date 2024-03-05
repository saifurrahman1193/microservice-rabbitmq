import { Schema, model, Document, Types } from 'mongoose';

enum IsActiveEnum {
    Inactive = 0,
    Active = 1,
}

// Define the user interface
interface IJWTRefreshToken extends Document {
    user_id: Types.ObjectId;
    expires_at: Date;
    is_active: IsActiveEnum;
    created_by?: Types.ObjectId;
    created_at?: Date;
}

// Define the user schema
const JWTRefreshTokenSchema = new Schema<IJWTRefreshToken>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to App model
    expires_at: { type: Date, required: true },
    is_active: {
        type: Number,
        enum: [IsActiveEnum.Inactive, IsActiveEnum.Active],
        default: IsActiveEnum.Active,
    },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => Date.now() },
});

// Define and export the user model
const JWTRefreshToken = model<IJWTRefreshToken>('JWTRefreshToken', JWTRefreshTokenSchema, 'jwt_access_token');


// Add a virtual property to the UserSchema
JWTRefreshTokenSchema.virtual('user', {
    type: 'ObjectId',
    ref: 'User',
    foreignField: '_id',
    localField: 'user_id',
    justOne: true
});

export {
    JWTRefreshToken
};
