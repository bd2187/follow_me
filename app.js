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

app.post('/postBlog', (req, res) => {

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

const port = 3000;
app.listen(port, () => { console.log(`Now listening to Port ${port}`) });