import Meeting from '../models/Meeting.js';

export const index = async (req, res) => {
    const data = await Meeting.aggregate([
        { $sort: { _id: -1 } },
    ]);
    res.json({ message: 'Success', data: data });
};

export const create = async (req, res) => {
    let formData = {...req.query, ...(req?.body?.data || req?.body)}
    console.log(formData);
    const { title, description, location, start_time, end_time } = formData;
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
