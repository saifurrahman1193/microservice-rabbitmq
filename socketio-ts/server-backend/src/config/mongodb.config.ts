import mongoose from 'mongoose';
import { config } from './index.config';

export const connect = async() => {
    await mongoose.connect(config?.mongo?.url, {
        retryWrites:true, w: 'majority'
    })  // ms-socketio-mongo-db-container = mongodb container name
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });
}