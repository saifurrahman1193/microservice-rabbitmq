import mongoose from 'mongoose';
const { Schema } = mongoose;

const meetingSchema = new Schema({ 
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    start_time: { type: Date, required: true},
    end_time: { type: Date, required: true},
    created_at: { type: Date, default: Date.now}
})

export default new mongoose.model('Meeting', meetingSchema, 'meeting');