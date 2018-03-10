const express = require('express');
const router = express.Router();

var BlogPost = require('../models/blogPostModel');

router.post('/post/add', (req, res) => {

    // Check if user is signed in

    // Check if all required fields are filled

    // Create new blogpost
    var blog = new BlogPost({
        title: 'Blog',
        body: 'Body',
        author: 'Author',
        likes: 0
    });

    // Save blog post
    blog.save((err, blog) => {

        if (err) {
            res.status(500).send('Internal server error');
        } else {
            res.json({
                status: 'success',
                blog
            });

            // Render new pug template?
        }
    });
});

router.post('/edit/:id/:title/:body/:author', (req, res) => {

    const {  id, title, body, author } = req.params;    

    // Check if user is logged in

    // Check if all required fields are filled

    // Find blog post by id
    BlogPost.findOne({ _id: id }, (err, blogPost) => {
        if (err) {
            res.status(500).send('Internal server error');
        } else {
            blogPost.title = title;
            blogPost.body = body;

            blogPost.save((err, updatedBlogPost) => {
                if (err) {
                    res.status(500).send('Internal server error');
                } else {
                    res.json(updatedBlogPost);
                }
            });
        }
    });
    // Edit contents of blog

});

module.exports = router;