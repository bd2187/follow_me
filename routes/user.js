const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/userModel');

router.get('/register', (req, res) => {
    res.render('register.pug');
});

router.post('/register', (req, res) => {
    const { firstName, lastName, username, password, email, confirmPassword } = req.body;
    
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log(err);                    
            } else {
                const user = new User({
                    firstName,
                    lastName,
                    username,
                    password: hash,
                    email
                });
        
                user.save((err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal server error.');
                    } else { 
                        res.redirect('/');
                    }
                });
            }
        });
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {

        if (err){
            console.log(`ERROR: ${err}`);
            return next(err);
        }

        if (!user) {
            console.log('Either username or password is incorrect');
            return res.render('index');
        }

        req.login(user, (err) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                return next(err);
            }            
            
            return res.redirect('/');
        });

    })(req, res, next);
});

module.exports = router;