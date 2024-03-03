import { toTitleCase } from '../../helper/common.helper';

interface ValidationCallback {
    (error?: Error): void;
}

interface ValidationRule {
    model: any,
    field: any,                 // it's come by default
    fieldNameToOverride?: any,  // it's come to override the default field name for custom purposes
    fieldValueToOverride?: any, // it's come to override the default field value  for custom purposes
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
    let { model, field, fieldNameToOverride, fieldValueToOverride, exceptField, exceptValue, message } = rule;

    field = fieldNameToOverride ? fieldNameToOverride : field;  // if value passes customly then default value will be overwritten otherwise default value will be applied
    value = fieldValueToOverride ? fieldValueToOverride : value;  // if value passes customly then default value will be overwritten otherwise default value will be applied

    // Build the filter object
    const filter: any = {
        [field]: value
    };

    console.log('exists', field, value, fieldValueToOverride, rule, filter);

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


