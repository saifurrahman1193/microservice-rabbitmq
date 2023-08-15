const express = require("express");
require('dotenv').config();

const app = express();

app.get('/', (req, res) => { 
    res.json({data: 'hello world from socket'});
});


app.listen(process.env.APP_PORT, () => {
    console.log('listening on port ' + process.env.APP_PORT);
})