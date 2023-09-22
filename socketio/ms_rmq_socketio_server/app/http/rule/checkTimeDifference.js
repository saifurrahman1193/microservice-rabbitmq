// Custom validation function to check the time difference
const checkTimeDifference = (start_time, end_time, minAllowedDifference = 0, maxAllowedDifference = 0, msg = '') => {
    const startTime = new Date(start_time);  // UTC time
    const endTime = new Date(end_time);      // UTC time

    // Calculate the time difference in milliseconds
    const timeDifference = endTime - startTime;

    // Define the maximum allowed time difference (e.g., 1 hour = 3600000 milliseconds)
    if (minAllowedDifference <= timeDifference && timeDifference <= maxAllowedDifference) {
        return true;
    }
    else{
        throw new Error(msg || 'Ivalid Range.');
    }
};
export default checkTimeDifference;