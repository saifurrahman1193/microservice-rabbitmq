// Custom validation function to check the time difference
const checkTimeDifference = (start_time, end_time, minAllowedDifference = 0, maxAllowedDifference = 0, msg = '') => {
    console.log(start_time, end_time, minAllowedDifference , maxAllowedDifference , msg );
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    // Calculate the time difference in milliseconds
    const timeDifference = endTime - startTime;

    // Define the maximum allowed time difference (e.g., 1 hour = 3600000 milliseconds)

    // Check if the time difference is greater than the allowed maximum
    if (minAllowedDifference <= timeDifference && timeDifference <= maxAllowedDifference) {
        throw new Error(msg || 'Ivalid Range.');
    }

    // Return true if the validation passes
    return true;
};
export default checkTimeDifference;