import fs from 'fs-extra';
import moment from 'moment'; 

export const logger = async (message, errorType='info') => {  
    var LogFile = `./storage/logs/${moment().format('YYYY-MM-DD')}.log`
    let ensureFileSync = fs.ensureFileSync(LogFile)
    console.log('=========ensureFileSync==========', ensureFileSync, LogFile);
    
    var logDate = moment().format('YYYY-MM-DD HH:mm:ss')
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


// Usage 
// import { logger } from '../../helpers/LogHelper.js';
// await logger('Successfully added!')  info (default)
// await logger(error?.message, 'error') info | error | error | critical | debug | alert | emergency | success
