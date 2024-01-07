import { Schema, model, Document } from 'mongoose';

// Define the authentication interface
interface IAuthentication {
    salt: string;
    password: string;
    sessionToken?: string;
}

// Define the user interface
interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    authentication: IAuthentication;
    avatar?: string;
}

// Define the user schema
const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: false },
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false }
    },
    avatar: { type: String, required: false } // Assuming avatar is required, adjust as needed
});

// Define and export the user model
const User = model<IUser>('User', UserSchema, 'user');


export default User;
