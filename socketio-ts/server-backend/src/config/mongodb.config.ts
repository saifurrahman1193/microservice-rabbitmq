import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : `mongodb://local-central-mongo-db-container:27017/socket_server`;

export const connect = async () => {
    await mongoose.connect(MONGO_URL, {
        retryWrites: false, 
        w: 'majority',
        // replicaSet: 'rs1',
    })  // ms-socketio-mongo-db-container = mongodb container name
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch(error => {
            console.error('Error connecting to MongoDB:', error.message);
        });
}

export const mongodbConfig = {
    url: MONGO_URL,
};