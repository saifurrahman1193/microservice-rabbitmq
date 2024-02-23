import * as crypto from 'crypto';

export const generateAccessToken = (tokenLength: number = 60): string => {
    return crypto.randomBytes(tokenLength).toString('hex');
};

export const generateRandomText = (tokenLength: number = 60): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
};



