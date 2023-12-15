import { Model } from 'mongoose';
import { toTitleCase } from '../../helper/Common';

interface ValidationRule {
    message?: string;
    field?: string; // Add more rule properties as needed
}

interface ValidationCallback {
    (error?: Error): void;
}

export default async (
    rule: ValidationRule,
    value: string,
    callback: ValidationCallback,
    model: Model<any> 
): Promise<void> => {
    const { field, message } = rule;

    // Check if the field already exists in the database
    const existingRecord = await model.findOne({ [`${field}`]: value });
    if (existingRecord) {
        throw new Error(message || `${toTitleCase(field || '')} is already exist.`);
    }
    callback();
};
