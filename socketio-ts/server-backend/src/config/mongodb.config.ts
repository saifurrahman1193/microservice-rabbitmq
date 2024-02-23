import mongoose from 'mongoose';
import { config } from './index.config';

export const connect = async () => {
    await mongoose.connect(config?.mongo?.url, {
        retryWrites: false, 
        w: 'majority',
        // replicaSet: 'rs0',
    })  // ms-socketio-mongo-db-container = mongodb container name
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch(error => {
            console.error('Error connecting to MongoDB:', error.message);
        });
}

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : `mongodb://local-central-mongo-db-container:27017/socket_server`;
export const mongodbConfig = {
    url: MONGO_URL,
};