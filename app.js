const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const express       = require('express');
const app           = express();
const path          = require('path');
const passport      = require('passport');
const session       = require('express-session');
const blogRoutes    = require('./routes/blog');
const userRoutes    = require('./routes/user');

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

require('./config/passport')(passport);

// Passport middleware
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());


// Set up local variables
app.get('*', (req, res, next) => {
    res.locals.USER = req.user || null;
    console.log(`USER: ${res.locals.USER}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    return (res.locals.USER) ? res.redirect('/dashboard') : res.redirect('/user/login');    
});

app.get('/dashboard', (req, res) => {
    try {
        const { USER } = res.locals;
        const userID = USER._id;
        
        // parse through blog collection and populate dashboard with user's blog posts
        var Blog = require('./models/blogPostModel');
        Blog.find({ userID }, (err, blogs) => {
            if (err) {
                console.log(err);
                return;
            } else {
                res.render('dashboard', {
                    blogs
                });
            }
        });
    } catch(err) {
        console.log(err);
        res.redirect('/user/login');
    }

    
});

// Additional Routes
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);

const port = 3000;
app.listen(port, () => { console.log(`Now listening to Port ${port}`) });