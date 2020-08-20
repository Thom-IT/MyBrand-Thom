const express = require('express');
const router = express.Router();
const User = require('../models/user'); //importing from model class to validate before registering
const response = require('express');
const mongoose = require('mongoose');
const schema = require('../models/user');
const constant = require('lodash');
const bcrypt = require('bcrypt');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const token = require('morgan');
const verify = require('../middleware/check-auth');
const uservalidation = require('../middleware/usersValidation');
const loginValidation = require('../middleware/usersValidation');

// Testing ==================
router.post('/register', verify, uservalidation, async(req, res) => {
    //Validating before save:
    // const { error } = schemaa.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message)

    const userE = await User.findOne({ email: req.body.email });
    if (userE) return res.status(400).send('Email Already Exist');
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
// //Validation login==================
const Joi = require('@hapi/joi');

const schemaavilid = Joi.object({
        //name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    })
    //====------------------end testing==========================
router.post('/login', async(req, res) => {
    // const error = await userValidaton.validateAsync(req.body);
    const { error } = schemaavilid.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // res.send(error.details[0].message);
    // res.send("Done");
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User Not FOUND');
    const pwd = await bcrypt.compare(req.body.password, user.password)
    if (!pwd) return res.status(400).send('the password is wrong');


    //CREATE AND ASSIGN TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({
        status: 200,
        token
    });
    //res.send('well done')

});
//=====Save Post=============
router.post('/createUser', verify, async(req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {

        if (user.length >= 1) {
            return res.status(409).json({
                message: "Mail Exist"
            });
        } else {

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                UserID: result._id
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }

            });
        }
    });
})

module.exports = router;