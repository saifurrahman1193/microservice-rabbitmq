import mongoose from 'mongoose';


export const connect = async() => {
    await mongoose.connect('mongodb://ms-socketio-mongo-db-container:27017/chat_app')  // ms-socketio-mongo-db-container = mongodb container name
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB');
    });
}