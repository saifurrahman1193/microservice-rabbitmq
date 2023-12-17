import crypto from 'crypto';

const SECRET = 'abcdefghijklmnop@324234fd575Aq41sdsdf254kyt696*5+-dgfgs.adasdasdasd21324356yfsqrstuvwxyz';

// Example: Generate a random cryptographic key
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}