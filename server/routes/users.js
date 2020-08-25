import express from 'express';
const router = express.Router();
import User from '../models/user'; //importing from model class to validate before registering
import response from 'express';
import mongoose from 'mongoose';
import schema from '../models/user';
import constant from 'lodash';
import bcrypt from 'bcrypt';
//const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';
import token from 'morgan';
import verify from '../middleware/check-auth';
import { userValidation, loginValidation } from '../middleware/usersValidation';

// //Validation login==================
import Joi from '@hapi/joi';

const schemaavilid = Joi.object({
        //name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    })
    //====------------------Admin Login==========================
router.post('/login', async(req, res) => {
    try {
        const { error } = schemaavilid.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('User Not FOUND');
        const pwd = await bcrypt.compare(req.body.password, user.password)
        if (!pwd) return res.status(400).send('the password is wrong');
        const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.status(200).send({
            status: 200,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
});
//================= Save user === === === === =
router.post('/createUser', userValidation, async(req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {

        if (user.length >= 1) {
            return res.status(409).json({
                message: "The user with that Mail Exist"
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
                            res.status(200).json({
                                UserID: result._id
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json({
                                error: err
                            });
                        });
                }

            });
        }
    });
})

module.exports = router;