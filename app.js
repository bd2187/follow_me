const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const express       = require('express');
const app           = express();
const path          = require('path');

// Connect to MongoDB
const database = require('./config/database');
mongoose.connect(database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to DB');
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static Directories Middleware
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Root Route
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/post/add', (req, res) => {

    var BlogPost = require('./models/blogPostModel');

    // Check if user is signed in

    // Check if all required fields are filled

    // Create new blogpost
    var blog = new BlogPost({
        title: 'Title',
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

app.post('/edit/:id/:title/:body/:author', (req, res) => {

    var BlogPost = require('./models/blogPostModel');
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

const port = 3000;
app.listen(port, () => { console.log(`Now listening to Port ${port}`) });