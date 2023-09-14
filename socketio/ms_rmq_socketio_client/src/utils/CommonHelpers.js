export const getNumbersInArray = (start=0, end=0, gap=1, targetLength=0, padString='0') => {
    var finalResult = []
    for (let i = start; i <= end; i=i+gap) {
        finalResult[i] = i.toString().padStart(targetLength, padString)
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
