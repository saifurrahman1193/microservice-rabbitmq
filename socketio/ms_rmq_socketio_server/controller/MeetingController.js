import Meeting from '../models/Meeting.js';

export const create = async (req, res) => {
    console.log(req.body);
    const { title, description, date } = req.body.data;
    const meeting = new Meeting({
        title: title,
        description: description,
        date: date
    });
    await meeting.save();

    res.json({ message: 'Success'});
};
