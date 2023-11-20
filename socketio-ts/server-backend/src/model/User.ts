import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({ 
    name: {type: String, required: true},
    email: {type: String, required: false},
    username: {type: String, required: true},
    authentication:{
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false}
    },
})

export const User =  mongoose.model('User', UserSchema, 'user');

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserByUserName = (username: string) => User.findOne({ username });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => User.findOne({ id });
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => User.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values)

