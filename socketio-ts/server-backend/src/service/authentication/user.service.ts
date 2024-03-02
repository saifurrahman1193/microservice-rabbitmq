import { User } from '../../model/authentication/user.model';
import mongoose from 'mongoose';

const getUsers = () => User.find();
const getUserByEmail = (email: string) => User.findOne({ email });
const getUserByUserName = (username: string) => User.findOne({ username }).lean();

const getMyInfo = async (req: any) => {
    let user_id = req.headers['user_id']
    let user_data = await User.findOne({ _id: new mongoose.Types.ObjectId(user_id) }).lean();
    return user_data;
};
const getUserById = (_id: string) => User.findOne({ _id: new mongoose.Types.ObjectId(_id) });
const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
const deleteUserById = (id: string) => User.findByIdAndDelete({ _id: id });
const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values)

export const userService = {
    getUsers,
    getUserByEmail,
    getUserByUserName,
    getMyInfo,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
}