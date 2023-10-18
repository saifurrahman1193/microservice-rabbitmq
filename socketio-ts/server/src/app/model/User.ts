import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({ 
    name: {type: String, required: true},
    email: {type: String, required: true},
    authentication:{
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, required: true, select: false}
    },
})

export const UserModel =  mongoose.model('User', userSchema, 'user');

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findOne({ id });
