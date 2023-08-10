const fs = require('fs-extra');
const moment = require('moment');

const log = exports.log = async (message, errorType='Error') => {
    var LogFile = `./app/storage/logs/${moment().format('yy-MM-DD')}.log`
    let ensureFileSync = fs.ensureFileSync(LogFile)
    console.log('=========ensureFileSync==========', ensureFileSync);
    
    var logDate = moment().format('yy-MM-DD HH:mm:ss')
    fs.appendFile(LogFile, `[${logDate}] ${process?.env?.APP_ENV||'local'}.${errorType.toUpperCase()} ${message} \r\n`, function (err) {
        if (err) return console.log(err);
    });
}




// errorType 
// ==========
// Info
// Warning
// Error
// Critical
// Debug
// Alert
// Emergency
