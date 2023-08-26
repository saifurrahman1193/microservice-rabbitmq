import Meeting from '../models/Meeting.js';

export const index = async (req, res) => {
    const data = await Meeting.aggregate([
        { $sort: { _id: -1 } },
    ]);
    res.json({ message: 'Success', data: data });
};

export const create = async (req, res) => {
    console.log(req.body);
    const { title, description, location, date } = req.body.data;
    const meeting = new Meeting({
        title: title,
        description: description,
        location: location,
        date: date
    });
    await meeting.save();

    res.json({ message: 'Success' });
};
