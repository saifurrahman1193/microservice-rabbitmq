import { JWTAccessToken } from '../../model/authentication/jwtaccesstoken.model';

// const getJWTAccessTokens = () => JWTAccessToken.find();
// const getJWTAccessTokenByEmail = (email: string) => JWTAccessToken.findOne({ email });
// const getJWTAccessTokenByJWTAccessTokenName = (username: string) => JWTAccessToken.findOne({ username }).lean();
// const getJWTAccessTokenBySessionToken = (sessionToken: string) => JWTAccessToken.findOne({ 'authentication.sessionToken': sessionToken });
// const getMyInfo = async (req: any) => JWTAccessToken.findOne({ 'authentication.sessionToken': req.cookies['SOCKET-SERVER-AUTH'] });
// const getJWTAccessTokenById = (_id: string) => JWTAccessToken.findOne({ _id });
const createJWTAccessToken = (values: Record<string, any>) => new JWTAccessToken(values).save().then((user) => user.toObject());
// const deleteJWTAccessTokenById = (id: string) => JWTAccessToken.findByIdAndDelete({ _id: id });
// const updateJWTAccessTokenById = (id: string, values: Record<string, any>) => JWTAccessToken.findByIdAndUpdate(id, values)

export const jwtaccesstokenService = {
    createJWTAccessToken,
}
