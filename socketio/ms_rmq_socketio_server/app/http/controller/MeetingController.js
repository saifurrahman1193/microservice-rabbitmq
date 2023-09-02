import Meeting from '../../model/Meeting.js';
import { set_response } from '../../helpers/APIResponser.js';
import { logger } from '../../helpers/LogHelper.js';

export const index = async (req, res) => {
    const data = await Meeting.aggregate([
        { $sort: { _id: -1 } },
    ]);
    return set_response(res, data, 200, 'success', ['Successfully completed'])
};

export const create = async (req, res) => {
    let formData = { ...req.query, ...(req?.body?.data || req?.body) }
    console.log(formData);
    const { title, description, location, start_time, end_time } = formData;
    const meeting = new Meeting({
        title: title,
        description: description,
        location: location,
        start_time: start_time,
        end_time: end_time,
    });
    await meeting.save()
        .then((data) => {
            return set_response(res, data, 201, 'success', ['Successfully created meeting'])
        })
        .catch(async (error) => {
            await logger(error?.message, 'error')
            return set_response(res, null, 500, 'success', ['Something went wrong!'])
        });
};
