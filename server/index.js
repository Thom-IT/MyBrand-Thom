const express = require('express');
const morgan = require('morgan');
const { Mongoose } = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
const mongoose = require('mongoose');

//import routes
const blogRoute = require('./routes/posts');
const userRoute = require('./routes/users');

const { use } = require('./routes/posts');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/blogs', blogRoute);
app.use('/users', userRoute);

//Route Middlewares
app.use(express.json());
app.use('/api/user', userRoute);

//error handleling===================
app.use((req, res, next) => {
    const error = new Error('Not found, check well your URL');
    error.status = 404;
    console.log(error.message),
        next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ Error: error.message });
});

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to Database')
});
//mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://thom:" + process.env.Mongo_ATLAS_PWD + "@cluster0-shard-00-00.gkwdn.mongodb.net:27017,cluster0-shard-00-01.gkwdn.mongodb.net:27017,cluster0-shard-00-02.gkwdn.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-fx9giz-shard-0&authSource=admin&retryWrites=true&w=majority")
app.listen(3000, () => console.log('the Server is Up and Running as Well'));