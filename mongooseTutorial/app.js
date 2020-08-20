const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());
//Imports Routes
const postsRoutes = require('./routes/posts');
app.use('/posts', postsRoutes);
//Routes
app.get('/', (req, res) => {
    res.send("We are Home now")
});
//Connecting to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => console.log('Connected to DB !!!')
);
//how to lisinning
app.listen(3000);