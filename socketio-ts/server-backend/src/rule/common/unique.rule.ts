import { Document, Model } from 'mongoose';

const unique = async (
    model: any,
    field: string,
    value: any
): Promise<number> => {
    try {
        // Build the filter object
        const filter: any = {
            [field]: value,
        };

        // Get the MongoDB document from the model
        const existingDocument: any = await model.findOne(filter).exec();

        // Return 1 if there are no matching documents, otherwise return 0
        return existingDocument ? 0 : 1;
    } catch (error) {
        console.error('Error checking uniqueness in MongoDB:', error);
        return 0; // Return 0 in case of an error
    }
};

export { unique };
