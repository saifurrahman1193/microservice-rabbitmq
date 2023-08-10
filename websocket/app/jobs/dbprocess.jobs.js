module.exports = app => {

    const schedule = require('node-schedule');
    const telegrambot = require('node-telegram-bot-api');
    const { sqlResultDynamicDB } = require('../helpers/sqlhelpers');
    const { log } = require('../helpers/loghelper');
    const moment = require('moment');

    // every 5 seconds scheduler
    schedule.scheduleJob('*/10 * * * * *', function () {
        process_work()
    });

    const process_work = async () =>{

        const request = {
            dbhost: process.env.DBPROCESS_HOST,
            dbport: process.env.DBPROCESS_PORT,
            dbusername: process.env.DBPROCESS_USER,
            dbpassword: process.env.DBPROCESS_PASSWORD,
            database: process.env.DBPROCESS_DB,
        };

        let where_clause = `WHERE COMMAND='Execute' `
        request?.database ? where_clause=where_clause+`AND DB='${request?.database}'` : null
        request?.dbusername ? where_clause=where_clause+`AND USER='${request?.dbusername}'` : null

        let query = `SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST ${where_clause} `

        
   
        
        try {
            var data = await sqlResultDynamicDB(query, request)
            if ( data?.length > 0) {
                data_times = [...data]?.filter(item=> ((item?.TIME>30) && (item?.TIME%30)<=5) )?.map(item=>item?.TIME)
                if (data_times?.length>0) {
                    send_message(`${data?.length} process is running in DB(${request?.database}). Times(${data_times})`)
                }
            }
        }
        catch (error) {
            console.log(`Something went wrong like db process db not connected ${moment().format('yy-MM-DD HH:mm:ss')}`);
        }
    }
    const send_message = (message='')=> {
        const token = process.env.TB_TOKEN;
        const chatId = process.env.TB_CHATID; // get your chat ID from the log

        const bot = new telegrambot(token, { polling: true });

        bot.sendMessage(chatId, message);
    }
};