
import moment from 'moment'; // If you're using ES Modules

export const jsDateToYMD =  (datetime) => {
    if (!datetime) return null;
    var date = datetime.getDate();
    var month = datetime.getMonth()+1; //Be careful! January is 0 not 1
    var year = datetime.getFullYear();
    var dateString = year + "-" +(month +'').padStart(2, '0') + "-" + (date+'').padStart(2, '0');
    return dateString
}


export const getCurrentYear = () => {
    return (moment().format('yy'));
}

export const getCurrentTime = () => {
    var today = moment();
    return today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}



export const timeCalculator = (time) => {
    var [hour, min, seconds] = time.split(":") 

    var ampm = 'am'
    var finalResult = ''

    if( time=='00:00:00' ) finalResult = ['12:00 am'] // midnight
    else if( time=='12:00:00' ) finalResult = ['12:00 pm'] // midnight
    else {
        if( parseInt(hour)>12) {  hour = (parseInt(hour)%12).toString(); ampm = 'pm'}
        else if( parseInt(hour)>0) {  hour = hour.toString(); ampm = 'am'}
        finalResult = hour.padStart(2, '0')+':'+min.padStart(2, '0')+' '+ampm
    }

    return finalResult;
}


export const getWeekFullDays = () => {
    var finalResult = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    return finalResult;
}

export const timeGenerator = (hour=0, min=0, ampm='am') => {
    var finalResult = ''
    if( parseInt(hour)==12 && parseInt(min)==0 && ampm=='am') finalResult = '00:00:00' // midnight
    else if( parseInt(hour)==12 && parseInt(min)==0 && ampm=='pm') finalResult = '12:00:00' // midday
    else{
        if( parseInt(hour)==12 && parseInt(min)>=0 && ampm=='am') hour='00' // midnight
        else if ( parseInt(hour)==12 && parseInt(min)>=0 && ampm=='pm') hour='12'  // noon
        else if ( ampm=='pm' ) hour= (12 + parseInt(hour)).toString()  // after 12 pm
        finalResult = hour+':'+min+':00'
    }
    return finalResult;
}

export const timeSplit = (time='00:00:00') => {
    var [hour, min, seconds] = time.split(":") 

    var ampm = 'am'
    var finalResult = ''

    if( time=='00:00:00' ) finalResult = ['12','00','am'] // midnight
    else if( time=='12:00:00' ) finalResult = ['12','00','pm'] // midday
    else {
        if( parseInt(hour)>12) {  hour = (parseInt(hour)%12).toString(); ampm = 'pm'}
        else if( parseInt(hour)>0) {  hour = hour.toString(); ampm = 'am'}
        finalResult = [hour.padStart(2, '0'),min.padStart(2, '0'),ampm]
    }

    return finalResult;
}


export const getToday = () => {
    return moment().format('yy-MM-DD')
}

export const getYesterday = () => {
    return moment().add(-1, 'days').format('yy-MM-DD')
}

export const getTomorrow = () => {
    return moment().add(1, 'days').format('yy-MM-DD')
}






// Date related

export const LastMonthFirstDate = ()=>{
    return moment().subtract(1,'months').startOf('month').format('yyyy-mm-dd');
}

export const LastMonthLastDate = ()=>{
    return moment().subtract(1,'months').endOf('month').format('yyyy-mm-dd');
}

export const LastMonthName = ()=>{
    return moment().subtract(1,'months').format('MMMM');
}

export const getTodayStartTime = () => {
    return moment().startOf('day').format('yy-MM-DD HH:mm:ss')
}

export const getTodayEndTime = () => {
    return moment().endOf('day').format('yy-MM-DD HH:mm:ss')
}

export const getSpecificDateTimeAMPM = (datetime) => {
    return moment(datetime).format('yy-MM-DD hh:mm A')
}
export const getSpecificDateTimeAMPMUTC = (datetime) => {
    return moment(datetime).utc().format('YYYY-MM-DD hh:mm A')
}

// export const getOneDateIsSameOrAfterAnotherDate = (datetime, datetime2) => {

//     moment(datetime)
    
//     return 
// }

