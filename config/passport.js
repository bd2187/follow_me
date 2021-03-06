const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

module.exports = (passport) => {    
    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findOne({username}, (err, user) => {
                                
                if (err) { return done(err); }
    
                if (!user) {
                    console.log('Incorrect username');
                    return done(null, false, { message: 'Incorrect username.' });
                }
    
                bcrypt.compare(password, user.password, (err, res) => {
                    if (!res) {
                        console.log('incorrect password');
                        return done(null, false, { message: 'Incorrect password.' });
                    } else {
                        console.log('logged in!');
                        return done(null, user);
                    }

                });
            });
    
            passport.serializeUser((user, done) => {
                done(null, user.id);
            });
    
            passport.deserializeUser((id, done) => {
                User.findById(id, (err, user) => {
                  done(err, user);
                });
            });
        }
    ));
};



