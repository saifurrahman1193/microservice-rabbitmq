const loghelper = require('../helpers/loghelper');
const mail = require('../helpers/mail');

// constructor
const Mailer = function(formData) {
    for (const property in formData) {
        this[property] = formData[property]
    }
};


Mailer.sendMail = async (formData, result) => {
    try {
        const body = 'Our test mail <strong>body</strong>.'
        await mail.NodeMailer({
            from: formData?.from,
            to: formData?.to,
            subject: formData?.subject,
            mailReceiverName: formData?.mailReceiverName,
            body: body
        })

        result(null, null);

        return;       
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Something went wrong!'] }, null);
        return;
    }
};

module.exports = Mailer;