const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const express       = require('express');
const app           = express();
const path          = require('path');
const blogRoutes    = require('./routes/blog');

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

// Routes
app.use('/blog', blogRoutes);


const port = 3000;
app.listen(port, () => { console.log(`Now listening to Port ${port}`) });