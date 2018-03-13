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
    res.locals.user = req.user || null;
    res.locals.login = req.isAuthenticated();
    console.log(res.locals.user);
    console.log(res.locals.login);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.render('index');
});

// Additional Routes
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);

const port = 3000;
app.listen(port, () => { console.log(`Now listening to Port ${port}`) });