module.exports = app => {

    prefix = "/chat"

    app.get(prefix , (req, res) => { res.render('chat/chat', {title: 'Chat App'}); });
};