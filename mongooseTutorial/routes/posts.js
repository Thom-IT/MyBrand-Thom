const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
    //GET ALL POSTS
router.get('/', async(req, res) => {
    // res.send("We are on Testing Posts");
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

//SUBMIT POST
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET SPECIFIC POST
router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});
//==Delete post==================
router.delete('/:postId', async(req, res) => {
    try {
        const deletedPost = await Post.remove({ _id: req.params.postId });
        res.json(deletedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
//================Updating a Post===============
router.patch('/:postId', async(req, res) => {
    try {
        const updatePost = await Post.updateOne({ _id: req.params.postId }, {
            $set: { title: req.body.title, description: req.body.description }

        });
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;