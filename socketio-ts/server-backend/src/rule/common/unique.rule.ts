import { toTitleCase } from '../../helper/common.helper';

interface ValidationCallback {
    (error?: Error): void;
}

interface ValidationRule {
    model: any,
    field: any,
    exceptField?: any,
    exceptValue?: any,
    message?: string;
    // Add more rule properties as needed
}

export default async (
    rule: ValidationRule,
    value: string,
    callback: ValidationCallback
): Promise<void> => {
    let { model, field, exceptField, exceptValue, message } = rule;

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

    message = message || `${toTitleCase(field || '')} already exist.`; // Capitalize first letter

    if (existingDocument) {
        throw new Error(message);
    }

    callback(); // Success case
};


