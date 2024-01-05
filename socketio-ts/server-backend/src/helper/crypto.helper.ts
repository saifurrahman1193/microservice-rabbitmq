import * as crypto from 'crypto';

export const generateAccessToken = (tokenLength=60): string => {
    return crypto.randomBytes(tokenLength).toString('hex');
};
