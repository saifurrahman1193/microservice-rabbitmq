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
const updateJWTAccessTokenSkippingToN = async(values: Record<string, any>) => {

    let jwt_number_of_tokens_allowed = process.env.JWT_NUMBER_OF_TOKENS_ALLOWED
    
    const data = await JWTAccessToken.find({ user_id: values?.user_id, is_active: 1 })
                .select('_id')
                .sort({ created_at: -1 }) // Sort in descending order by created_at
                .limit(jwt_number_of_tokens_allowed) // Take only the last 5 documents
                .lean();
    const ids = data.map(doc => doc._id);
    console.log(ids);
    

    // JWTAccessToken.updateMany(
    //     {
    //         _id: { $nin: idsToSkip }
    //     },
    //     {
    //         // Your update operations here
    //         $set: { /* yourUpdateFields */ },
    //     }
    // );
};

export const jwtaccesstokenService = {
    createJWTAccessToken,
    updateJWTAccessTokenSkippingToN
}
