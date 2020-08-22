import express from 'express';
import morgan from 'morgan';
import { Mongoose } from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv/config');
const app = express();
import mongoose from 'mongoose';
const DB = process.env.DB_CONNECTION;

//import routes
import blogRoute from './routes/posts';
import userRoute from './routes/users';
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/blogs', blogRoute);
app.use('/users', userRoute);

//Route Middlewares
app.use(express.json());
app.use('/api/user', userRoute);

// //error handleling===================
app.use((req, res, next) => {
    return res.status(404).send("Not found, check well your URL");
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ Error: error.message });
});

//connect to DB
mongoose.connect('mongodb+srv://thom:123@cluster0.gkwdn.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to Database')
});
//mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://thom:" + process.env.Mongo_ATLAS_PWD + "@cluster0-shard-00-00.gkwdn.mongodb.net:27017,cluster0-shard-00-01.gkwdn.mongodb.net:27017,cluster0-shard-00-02.gkwdn.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-fx9giz-shard-0&authSource=admin&retryWrites=true&w=majority")
app.listen(3000, () => console.log('the Server is Up and Running as Well'));
module.exports = app;