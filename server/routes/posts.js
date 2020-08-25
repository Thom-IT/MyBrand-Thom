import express from 'express';
const router = express.Router();
import Post from '../models/Post';
import response from 'express';
import Mongoose from 'mongoose';
import { schema } from '../models/Post';
import verify from '../middleware/check-auth';
import blogsValidation from '../middleware/validateBlogs';
import { bValidate, commentValidate } from '../middleware/validateBlogs';
import post from './users';
//=====create a Blog Post=============
router.post('/', verify, bValidate, (req, res, next) => { //http://localhost:3000/blogs/

    const blog = new Post({
        title: req.body.title,
        photoUrl: req.body.photoUrl,
        description: req.body.description
    });
    blog.save().then(result => {
        //console.log(result);
        res.status(201).json({
            createdBlog: {
                title: result.title,
                photoUrl: result.photoUrl,
                description: result.description,
                date: result.date,
                _id: result._id,
            }
        });
    })
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
                        // //Some Usfull Querries
                        // click_to_Like: 'Like Blog',
                        // type: 'DELETE',
                        // url: 'http://localhost:3000/blogs/likes/' + doc._id,

                        // click_to_coment: 'Comment the Blog',
                        // Method: 'PATCH',
                        // url_path: 'http://localhost:3000/blogs/comment/' + doc._id
                    }
                })
            };
            //console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(response)
            }
        })
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
                res.status(404).send('No Data found on that ID');
            }

        })

});
//==Delete post==================
router.delete('/:postId', verify, async(req, res) => {

    const blog = await Post.findOne({ _id: req.params.postId });
    if (!blog) return res.status(404).send('Not Found');
    await Post.remove({ _id: req.params.postId });

    return res.status(200).json({
        status: 200,
        message: "deleted Successiful",
        //deletedPost
    });
});
//================Updating a Post===============
router.patch('/:postId', bValidate, verify, async(req, res) => {

    const blog = await Post.findOne({ _id: req.params.postId });
    if (!blog) return res.status(404).send('blog Not Found');
    await Post.updateOne({ _id: req.params.postId }, {
        $set: { title: req.body.title, description: req.body.description }

    });
    return res.status(200).json({ message: 'successfuly Updated' });

});
//=================comment======================
router.post('/comment/:blogId', commentValidate, async(req, res) => {

    const blog = await Post.findOne({ _id: req.params.blogId });
    if (!blog) return res.status(404).send('Blog Not Found');
    await Post.updateOne({ _id: req.params.blogId }, { $push: { comment: req.body } });
    return res.status(200).json({
        status: 200,
        message: 'Blog comments is recorded'
    });
});
//=================Likes======================
router.post('/likes/:blogId', async(req, res) => {

    const blog = await Post.findOne({ _id: req.params.blogId });
    if (!blog) return res.status(404).send('Blog Not Found');
    await Post.updateOne({ _id: req.params.blogId }, { $inc: { likes: 1 } });
    return res.status(200).json({
        status: 200,
        message: 'thanks for Liking the Blog'
    });
});
module.exports = router;