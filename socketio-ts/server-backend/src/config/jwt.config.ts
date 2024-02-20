// import mongoose from 'mongoose';
// import { config } from './index.config';

// export const connect = async() => {
//     await mongoose.connect(config?.mongo?.url, {
//         retryWrites:true, w: 'majority'
//     })  // ms-socketio-mongo-db-container = mongodb container name
//     .then(() => {
//         console.log('Connected to MongoDB');
//     }).catch(error => {
//         console.error('Error connecting to MongoDB:', error.message);
//     });
// }


import * as jwt from 'jsonwebtoken';

interface Payload {
    userId: number;
    username: string;
}

const secretKey = 'yourSecretKey'; // Replace with your secret key
const payload: Payload = {
    userId: 123,
    username: 'john_doe',
};

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log('Generated JWT:', token);
