const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const response = require('express');
const Mongoose = require('mongoose');
const { schema } = require('../models/Post');
const { constant } = require('lodash');



//=====Save Post=============
router.post('/', async(req, res, next) => { //http://localhost:3000/blogs/
    const Joi = require('joi');
    const data = req.body;
    const Schema = Joi.object().keys({
        title: Joi.string().min(3).max(20).required(),
        photoUrl: Joi.string().required(),
        description: Joi.string().required()
    });
    const { error } = Schema.validate(data);

    const id = Math.ceil(Math.random() * 9999999);
    if (error) {
        res.status(400).json({
            errorMessage: error.details[0].message

            // status: 'error',
            // message: 'Invalid Request Data',
            // data: data
        });
    } else {
        const blog = new Post({
            _id: new Mongoose.Types.ObjectId(),
            title: req.body.title,
            photoUrl: req.body.photoUrl,
            description: req.body.description
        });
        blog.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'the Blog is well Created',
                createdBlog: {
                    title: result.title,
                    photoUrl: result.photoUrl,
                    description: result.description,
                    date: result.date,
                    _id: result._id,
                    // request: {
                    //     type: 'GET',
                    //     url: 'http://localhost:3000/post/' + result._id
                    // }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        //================================================

        // res.json({
        //     status: 'Success',
        //     message: 'Registered successfully  !!!',
        //     data: Object.assign({ id })
        // });
    }
});



//=================ALL DATA================
router.get('/', async(req, res, next) => {
    Post.find()
        .select('title photoUrl description')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                blogsData: docs.map(doc => {
                    return {
                        title: doc.title,
                        photoUrl: doc.photoUrl,
                        description: doc.description,
                        _id: doc._id,
                        date: doc.date,
                        // request: {
                        //     type: 'GET',
                        //     url: 'http://localhost:3000/post/' + doc._id
                        // }
                    }
                })
            };
            //console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'No Entry found in Database'
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//specific post
router.get('/:blogId', async(req, res, next) => {

    const id = req.params.postId;
    Post.findById(id)
        .exec()
        .then(doc => {
            console.log("Data coming from DB", doc);
            if (doc) {
                res.status(200).json({
                    blogs: doc,
                    //message: 'Click to view All Post',
                    // request: {
                    //     type: 'GET',
                    //     url: 'http://localhost:3000/post/'
                    // }
                });

            } else {
                res.status(404).json({ message: 'No Data found on that ID' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'No Data found on that ID' });
        });
});
//=================delete=====================
router.delete('/:blogId', async(req, res) => {
    const id = req.params.postId;
    Post.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ result, message: 'you deleted data with ID:' + id })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        });

});

//=================Update======================
router.patch('/:blogId', async(req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, {
            $set: {
                title: req.body.title,
                photoUrl: req.body.photoUrl,
                description: req.body.description
            }
        });
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

// function validationError(message) {
//     const Schema = Joi.object()({
//         title: Joi.string().required(),
//         photoUrl: Joi.string().required(),
//         description: Joi.string().required()
//     });
//     return Joi.validate(message, schema);
//     const validation = schema.validate(req.body);
//     res.send(validation);
// }

module.exports = router;