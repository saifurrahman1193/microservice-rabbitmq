
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




export const getNumbersInArray = (start=0, end=0, gap=1, targetLength=0, padString='0') => {
    var finalResult = []
    for (let i = start; i <= end; i=i+gap) {
        finalResult[i] = i.toString().padStart(targetLength, padString)
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

export const arrToLowerCase = (arr=[]) => {
    return arr.map(str => str.toLowerCase());
}

export const downloadFileWithLink = (href) => {
    var link = document.createElement("a");
    let name = (href?.split("/") || [])
    name = name[name?.length-1]
    link.setAttribute('download', name);
    link.href = href;
    document.body.appendChild(link);
    link.click();
    link.remove();
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


export const permission_routes = [
    { pathname: '/transaction-report', permission: 'transaction report'},
    { pathname: '/activity-log', permission: 'activity log list'},
    { pathname: '/reduction-list', permission: 'transaction amount reduction list'},
    { pathname: '/retry-app-status', permission: 'retry app status'},
    { pathname: '/ibbl-transaction-search', permission: 'ibbl transaction search'},
    
    { pathname: '/trigger-amount', permission: 'trigger amount'},
    { pathname: '/offer-expire', permission: 'trigger amount offer expire'},
    { pathname: '/client-bulk-expire', permission: 'trigger amount client bulk expire'},
    { pathname: '/allow-all-trigger-amount-to-client', permission: 'allow all trigger amount to a client'},
    { pathname: '/add-new-trigger-amount-to-clients', permission: 'add new trigger amount to clients'},
    { pathname: '/blocked-amount-list', permission: 'blocked amount list'},

    { pathname: '/users', permission: 'user list'},
    { pathname: '/roles', permission: 'role list'},
    { pathname: '/permissions', permission: 'permission list'},
    
    { pathname: '/manage-callback', permission: 'callback list'},
    { pathname: '/client-ip', permission: 'client ip list'},
] 

export const checkPermissionsWiseRouteChecker = (props) => {

    const current_pathname = props?.location?.pathname || ''

    let permission_route =  permission_routes?.find((item) => {
        return item?.pathname==current_pathname
    })

    if (!(props?.permissions?.includes(permission_route?.permission))) {
        props.history.push('/')
    }
}



export const userAgent = navigator.userAgent;

// export const ip_address = ip.address()


export const json_formatter = (str='') => {

    str = JSON.stringify(str, null, 4)
    
    return str
};

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

// export const getOneDateIsSameOrAfterAnotherDate = (datetime, datetime2) => {

//     moment(datetime)
    
//     return 
// }


// language related
export const convertEngToBangla = (str='') => {

    str = str?.replace(/Day|Days|day|days/gi, 'দিন') || ''
    str = str?.replace(/Hour|Hours|hour|hours/gi, 'ঘন্টা') || ''

    str = convertEngToBanglaNumber(str)

    return str
}

export const convertEngToBanglaNumber = (str='') => {

    var finalEnlishToBanglaNumber={'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
 
    var retStr = str;
    for (var x in finalEnlishToBanglaNumber) {
        retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
    }
    return retStr;
}


export const badge_colors = ['badge-light-primary', 'badge-light-info', 'badge-light-success', 'badge-light-danger' ,  'badge-light-warning', ]
