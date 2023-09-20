import Meeting from '../../model/Meeting.js';
import { set_response } from '../../helpers/APIResponser.js';
import { logger } from '../../helpers/LogHelper.js';
import { paginate } from '../../helpers/Pagination.js';

export const index = async (req, res) => {
    let formData = { ...req?.query, ...req?.body }

    let data = await paginate(req, formData, Meeting)

    return set_response(res, data, 200, 'success', ['Successfully completed'])
}

export const find = async (req, res) => {
    const id = req?.params?.id;
    const data = await Meeting.findById(id);
    return set_response(res, data, 200, 'success', ['Successfully completed'])
}

export const create = async (req, res) => {
    console.log('create');
    let formData = { ...req?.query, ...req?.body }
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
            return set_response(res, null, 500, 'error', ['Something went wrong!'])
        });
}

export const deleting = async (req, res) => {
    const id = req?.params?.id;

    try {
        // Use the Mongoose model to find and delete the item by ID
        const data = await Meeting.findByIdAndDelete(id);

        if (!data) {
            return set_response(res, data, 404, 'error', ['Record not found'])
        }

        return set_response(res, data, 200, 'error', ['Record deleted successfully'])
    } catch (err) {
        console.error(err);
        return set_response(res, null, 500, 'error', ['Server error'])
    }
}


export const update = async (req, res) => {

    const id = req?.params?.id;
    let formData = { ...req?.query, ...req?.body }
    const { title, description, location, start_time, end_time } = formData;

    console.log(formData);


    try {
        // Use the Mongoose model to find and update the item by ID
        const data = await Meeting.findByIdAndUpdate(
            id,
            { title, description, location, start_time, end_time },
            { new: true }
        );

        if (!data) {
            return set_response(res, data, 404, 'error', ['Record not found'])
        }

        return set_response(res, data, 200, 'error', ['Record updated successfully'])
    } catch (err) {
        console.error(err);
        return set_response(res, null, 500, 'error', ['Server error'])
    }
}
