import dotenv from 'dotenv';
dotenv.config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || '';
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || '';
const JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS || '300');
const JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS || '31536000');
const JWT_NUMBER_OF_TOKENS_ALLOWED = parseInt(process.env.JWT_NUMBER_OF_TOKENS_ALLOWED || '', 10)


export const jwtConfig =  {
    access_token_secret : JWT_ACCESS_TOKEN_SECRET,
    refresh_token_secret : JWT_REFRESH_TOKEN_SECRET,
    access_token_expires_in_seconds : JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    refresh_token_expires_in_seconds : JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
    number_of_tokens_allowed : JWT_NUMBER_OF_TOKENS_ALLOWED
};
