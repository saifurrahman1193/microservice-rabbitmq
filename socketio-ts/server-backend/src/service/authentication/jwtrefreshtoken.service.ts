import { JWTRefreshToken } from '../../model/authentication/jwtrefreshtoken.model';
import { config } from '../../config/index.config';
import mongoose from 'mongoose';


const createJWTRefreshToken = (values: Record<string, any>) => new JWTRefreshToken(values).save().then((user) => user.toObject());



// const getValidRefreshTokenUsingJWTRefreshTokenID = async(values: Record<string, any>) => {
//     return await JWTRefreshToken.findOne({ _id: values?.jwt_access_token_id, is_active: 1, expires_at: { $gt: new Date().toISOString() } }).lean();
// };

// // expire one token with a token id
// const expireJWTTokenWithTokenId = async(values: Record<string, any>) => {
//     await JWTRefreshToken.updateOne(
//         // The criteria for finding the document to update
//         { 
//             _id: new mongoose.Types.ObjectId(values.jwt_access_token_id), // Token ID to match
//             is_active: 1,                       // Active status to match
//         },

//         // The update to be performed on the matched document
//         { 
//             $set: { 
//                 is_active: 0,                    // Set is_active to 0 to mark it as inactive
//                 expires_at: new Date().toISOString() // Set expires_at to the current time
//             } 
//         }
//     );
// };

// // expire all the tokens of a specific user
// const expireJWTTokenWithUserId = async(values: Record<string, any>) => {
//     await JWTRefreshToken.updateOne(
//         // The criteria for finding the document to update
//         { 
//             user_id: new mongoose.Types.ObjectId(values.user_id), // Token ID to match
//             is_active: 1,                       // Active status to match
//         },

//         // The update to be performed on the matched document
//         { 
//             $set: { 
//                 is_active: 0,                    // Set is_active to 0 to mark it as inactive
//                 expires_at: new Date().toISOString() // Set expires_at to the current time
//             } 
//         }
//     );
// };

export const jwtrefreshtokenService = {
    createJWTRefreshToken,
    // getValidRefreshTokenUsingJWTRefreshTokenID,
    // expireJWTTokenWithTokenId,
    // expireJWTTokenWithUserId
}
