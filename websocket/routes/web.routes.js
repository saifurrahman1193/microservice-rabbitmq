module.exports = app => {

    prefix = "/"

    app.get(prefix + "/", (req, res) => {
        res.render('home', {layout: false});
    });
};