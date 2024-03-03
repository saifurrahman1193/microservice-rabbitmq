import { toTitleCase } from '../../helper/common.helper';

const unique = async (params: any): Promise<any> => {
    try {
        let { model, field, value, exceptField, exceptValue, message } = params;

        // Build the filter object
        const filter: any = {
            [field]: value,
        };

        // If exceptField and exceptValue are provided, exclude them from the filter
        if (exceptField && exceptValue) {
            filter[exceptField] = { $ne: exceptValue };
        }

        // Get the MongoDB document from the model
        const existingDocument: any = await model.findOne(filter).exec();

        message = message || `${toTitleCase(field || '')} is already exist.`

        return existingDocument
            ? { fails: true, messages: [message], errors: [{ field, message }] }
            : { fails: false };
    } catch (error) {
        console.error('Error checking uniqueness in MongoDB:', error);
        return { fails: true, messages: ['Error checking uniqueness in MongoDB'], errors: error };
    }
};

export { unique };
