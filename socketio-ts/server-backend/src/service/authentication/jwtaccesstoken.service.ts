import { JWTAccessToken } from '../../model/authentication/jwtaccesstoken.model';
import { config } from '../../config/index.config';
import mongoose from 'mongoose';


const createJWTAccessToken = (values: Record<string, any>) => new JWTAccessToken(values).save().then((user) => user.toObject());

const updateJWTAccessTokenInactive = async(values: Record<string, any>) => {
    const data = await JWTAccessToken.find({ user_id: values?.user_id, is_active: 1 })
                .select('_id')
                .sort({ created_at: -1 }) // Sort in descending order by created_at
                .skip(config.jwt.number_of_tokens_allowed - 1)
                .lean();
                
    const ids_to_inactive = data.map(doc => doc._id);

    await JWTAccessToken.updateMany(
        { _id: { $in: ids_to_inactive } },
        { $set: { is_active: 0, expires_at: new Date().toISOString() } }
    );
};

const getValidAccessTokenUsingJWTAccessTokenID = async(values: Record<string, any>) => {
    return await JWTAccessToken.findOne({ _id: values?.jwt_access_token_id, is_active: 1, expires_at: { $gt: new Date().toISOString() } }).lean();
};

// expire one token with a token id
const expireJWTAccessTokenWithTokenId = async(values: Record<string, any>) => {
    await JWTAccessToken.updateOne(
        // The criteria for finding the document to update
        { 
            _id: new mongoose.Types.ObjectId(values.jwt_access_token_id), // Token ID to match
            is_active: 1,                       // Active status to match
        },

        // The update to be performed on the matched document
        { 
            $set: { 
                is_active: 0,                    // Set is_active to 0 to mark it as inactive
                expires_at: new Date().toISOString() // Set expires_at to the current time
            } 
        }
    );
};

// expire all the tokens of a specific user
const expireJWTTokenWithUserId = async(values: Record<string, any>) => {
    await JWTAccessToken.updateOne(
        // The criteria for finding the document to update
        { 
            user_id: new mongoose.Types.ObjectId(values.user_id), // Token ID to match
            is_active: 1,                       // Active status to match
        },

        // The update to be performed on the matched document
        { 
            $set: { 
                is_active: 0,                    // Set is_active to 0 to mark it as inactive
                expires_at: new Date().toISOString() // Set expires_at to the current time
            } 
        }
    );
};

export const jwtaccesstokenService = {
    createJWTAccessToken,
    updateJWTAccessTokenInactive,
    getValidAccessTokenUsingJWTAccessTokenID,
    expireJWTAccessTokenWithTokenId,
    expireJWTTokenWithUserId
}
