import { Schema, model } from 'mongoose';

interface IAuthentication {
    salt: string;
    password: string;
    sessionToken?: string;
}

interface IUser {
    name: string;
    email: string;
    username: string;
    authentication: IAuthentication;
    avatar: string;
}


const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: false },
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false }
    },
})

const User = model('User', UserSchema, 'user');

export default User;


