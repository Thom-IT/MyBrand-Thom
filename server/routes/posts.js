const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const response = require('express');
const Mongoose = require('mongoose');
const { schema } = require('../models/Post');
const verify = require('../middleware/check-auth');
const { blogsValidation } = require('../middleware/validateBlogs');
const bValidate = require('../middleware/validateBlogs');
const { post } = require('./users');



//=====Save Post=============
router.post('/', verify, bValidate, async(req, res, next) => { //http://localhost:3000/blogs/

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

});



//=================ALL DATA================
router.get('/', async(req, res, next) => {
    Post.find()
        .select('title photoUrl description comment')
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
                        comment: doc.comment,
                        likes: doc.likes,
                        //Some Usfull Querries
                        click_to_Like: 'Like Blog',
                        type: 'DELETE',
                        url: 'http://localhost:3000/blogs/likes/' + doc._id,

                        click_to_coment: 'Comment the Blog',
                        Method: 'PATCH',
                        url_path: 'http://localhost:3000/blogs/comment/' + doc._id
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

    const id = req.params.blogId;
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
router.delete('/:blogId', verify, async(req, res) => {
    const id = req.params.blogId;
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

//=================Update Blog======================
router.patch('/:blogId', verify, bValidate, async(req, res) => {
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

//await Post.updateOne({ _id: req.params.id }, { $push: { comments: req.body } });

//=================comment======================
router.post('/comment/:blogId', async(req, res) => {
    try {
        await Post.updateOne({ _id: req.params.blogId }, { $push: { comment: req.body } });
        res.status(200).json({
            status: 200,
            message: 'Blog comments is recorded'
        });
    } catch (err) {
        res.json({ message: err });
    }

});


//=================Likes======================
router.post('/likes/:blogId', async(req, res) => {
    try {
        await Post.updateOne({ _id: req.params.blogId }, { $inc: { likes: 1 } });
        res.status(200).json({
            status: 200,
            message: 'thanks for Liking the Blog'
        });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }

});
module.exports = router;