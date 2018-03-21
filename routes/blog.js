const express = require('express');
const router = express.Router();

var BlogPost = require('../models/blogPostModel');

router.post('/post/add', (req, res) => {

    // Check if user is signed in

    // Check if all required fields are filled

    // Create new blogpost
    var blog = new BlogPost({
        title: 'MyBlog',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        userID: '5aa5bbaee4353a06e2a27ec5',
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

router.post('/edit/:id/:title/:body/:userID', (req, res) => {

    const {  id, title, body, userID } = req.params; 

    BlogPost.findOne({_id: id})
    .then(function(blogPost) {
        blogPost.title = title;
        blogPost.body = body;
        return blogPost.save()
    })
    .then(function(updatedBlogPost) {
        res.json({
            status: 'success',
            title: updatedBlogPost.title,
            body: updatedBlogPost.body,
            blogID: updatedBlogPost._id
        });
    })
    .catch(function(err) {
        res.status(500).send('Internal server error');
    });

});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    
    // Check if user is logged in
    BlogPost.remove({ _id: id }, (err) => {
        if (err) {
            res.status(500).send('Internal server error');
        } else {
            res.json({
                status: 'success',
                message: 'Your post was deleted'
            });
        };
    });
});

module.exports = router;