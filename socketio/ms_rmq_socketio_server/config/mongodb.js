import mongoose from 'mongoose';


export const connect = async() => {
    await mongoose.connect('mongodb://local-central-mongo-db-container:27017/socket_server')  // ms-socketio-mongo-db-container = mongodb container name
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB');
    });
}