import Meeting from '../models/Meeting.js';

export const index = async (req, res) => {
    const data = await Meeting.aggregate([
        { $sort: { _id: -1 } },
    ]);
    res.json({ message: 'Success', data: data });
};

export const create = async (req, res) => {
    console.log(req.body.data);
    const { title, description, location, start_time, end_time } = req.body.data;
    const meeting = new Meeting({
        title: title,
        description: description,
        location: location,
        // start_time: start_time,
        // end_time: end_time,

    });
    await meeting.save();

    res.json({ message: 'Success' });
};
