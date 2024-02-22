import * as crypto from 'crypto';

export const generateAccessToken = (tokenLength = 60): string => {
    return crypto.randomBytes(tokenLength).toString('hex');
};

export const generateRandomText = (tokenLength = 60): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  // url safe characters

    const charactersLength = characters.length;

    let result = '';
    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
};


