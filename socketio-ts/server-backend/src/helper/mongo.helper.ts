export const convertMongoErrorToCustomError = async(mongoError: any) => {
    
    if (mongoError && mongoError.code && mongoError?.keyPattern) {
        
        const fieldName = Object.keys(mongoError.keyPattern)[0];
        const errorMessage = await generateErrorMessage(fieldName, mongoError.code)

        return [
            {
                message: errorMessage,
                field: fieldName
            }
        ];
    } else {
        // Handle other MongoDB errors or return a generic error message
        return [
            {
                message: 'An error occurred',
                field: 'unknown'
            }
        ];
    }
}

const generateErrorMessage = async (fieldName: string, mongoErrorCode: number): Promise<string> => {
    let errorMessage = 'Something went wrong!';
    
    switch (mongoErrorCode) {
        case 11000:
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`;
            break;
        // Add more cases for other field names as needed
        default:
            errorMessage = 'Something went wrong!';
            break;
    }

    return errorMessage;
};



