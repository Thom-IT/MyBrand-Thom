const express = require('express');
const morgan = require('morgan');
const { Mongoose } = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
const mongoose = require('mongoose');

//import routes
const blogRoute = require('./routes/posts');
const { use } = require('./routes/posts');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/blogs', blogRoute);


//error handleling===================
app.use((req, res, next) => {
    const error = new Error('Not found, check well your URL');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ Error: error.message });
});
//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('connected to Database'));
mongoose.Promise = global.Promise;
app.listen(3000);