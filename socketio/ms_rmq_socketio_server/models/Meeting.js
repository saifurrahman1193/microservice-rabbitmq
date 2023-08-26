import mongoose from 'mongoose';
const { Schema } = mongoose;

const meetingSchema = new Schema({ 
    title: String,
    description: String,
    location: String,
    date: { type: Date, default: new Date()},
    created_at: { type: Date, default: Date.now}
})

export default new mongoose.model('Meeting', meetingSchema, 'meeting');