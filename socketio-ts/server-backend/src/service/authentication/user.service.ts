import User from '../../model/authentication/user.model';

const getUsers =  () => User.find();
const getUserByEmail =  (email: string) => User.findOne({ email });
const getUserByUserName =  (username: string) => User.findOne({ username });
const getUserBySessionToken =  (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
const getMyInfo =  async(req: any) => User.findOne({ 'authentication.sessionToken': req.cookies['SOCKET-SERVER-AUTH'] });
const getUserById =  (_id: string) => User.findOne({ _id });
const createUser =  (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
const deleteUserById =  (id: string) => User.findByIdAndDelete({ _id: id });
const updateUserById =  (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values)

export const userService = {
    getUsers,
    getUserByEmail,
    getUserByUserName,
    getUserBySessionToken,
    getMyInfo,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
}