const { sqlResultDynamicDB, paginate } = require('../helpers/sqlhelpers');
const { now } = require('../helpers/datehelpers');
const authhelper = require('../helpers/authhelper');
const loghelper = require('../helpers/loghelper');


// constructor
const TelegramBot = function (formData) {
    for (const property in formData) {
        this[property] = formData[property]
    }
};



// TelegramBot.sendTestMessage = async (formData, request, result) => {
//     try {

//         const token = process.env.TB_TOKEN;
//         const chatId = process.env.TB_CHATID; // get your chat ID from the log

//         const telegrambot = require('node-telegram-bot-api');


//         // Create a bot that uses 'polling' to fetch new updates
//         const bot = new telegrambot(token, { polling: true });




//         bot.onText(/\/start/, (msg) => {
//             bot.sendMessage(msg.chat.id, "Saifur Test");
//         });

//         bot.sendMessage(chatId, "Saifur Test message+++++++++++++++++++");


//         result(null, {
//             "data": null,
//         });
//         return;
//     } catch (error) {
//         await loghelper.log(error?.message, 'error')
//         result({ 'message': error?.message }, null);
//         return;
//     }
// };





module.exports = TelegramBot;