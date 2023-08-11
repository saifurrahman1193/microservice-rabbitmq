require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var multer = require('multer');
var forms = multer();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {engine} = require('express-handlebars');
const moment = require('moment');
const path = require('path'); 

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));

// app.use(express.static('app/public'))

// =========cors==========
app.use(cors());
// =========cors==========

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(forms.array()); 
app.use(express.static('public'));


// app.post('/post-test', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

require("./routes/routes.js")(app);   // all routes 
require("./app/jobs/jobs.js")(app);   // all jobs

// Handling Errors
app.use( async(err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

//   await loghelper.log(error?.message, 'error')

  res.status(err.statusCode).json({
    message: err.message,
  });
});


// set port, listen for requests
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}. time : ${moment().format('yy-MM-DD')}` );
});




