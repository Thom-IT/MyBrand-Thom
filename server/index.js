import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoute from './routes/posts';
import userRoute from './routes/users';
//swagger documentation===
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

dotenv.config();
const app = express();
//for testing locally use below link in swagger.js @host:   "host": "localhost:3000",
//setting cors and config
import cors from 'cors';
app.use(cors())



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 3000;
//import routes

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/blogs', blogRoute);
app.use('/users', userRoute);
//app.use('/http://localhost:3000', welcome);

//Route Middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'Welcome to My Brand Thomas Application'
    })
});
// //error handleling===================
app.use((req, res, next) => {
    return res.status(404).send({ message: "Not found, check well your URL" });
})
app.use((error, req, res, next) => {
    res.status(error.status || 400).json({ message: "Invalid Request" });
});
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({ Error: error.message });
// });
//connect to DB
mongoose.connect(process.env.Db_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to Database')
});
//mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://thom:" + process.env.Mongo_ATLAS_PWD + "@cluster0-shard-00-00.gkwdn.mongodb.net:27017,cluster0-shard-00-01.gkwdn.mongodb.net:27017,cluster0-shard-00-02.gkwdn.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-fx9giz-shard-0&authSource=admin&retryWrites=true&w=majority")
app.listen(PORT, () => console.log('the Server is Up and Running as Well'));
module.exports = app;