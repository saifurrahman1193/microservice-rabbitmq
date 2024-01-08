import { toTitleCase } from '../../helper/common.helper';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';

const unique = async (
    model: any,
    field: string,
    value: any,
    exceptField?: string | null,
    exceptValue?: any,
    message?: string,
): Promise<any> => {
    try {
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
                ? { fails: true, messages: [message], errors: [{ field: 'username', message }] }
                : { fails: false };
    } catch (error) {
        console.error('Error checking uniqueness in MongoDB:', error);
        return 0; // Return 0 in case of an error
    }
};

export { unique };
