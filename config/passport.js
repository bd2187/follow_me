const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username}, (err, user) => {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            bcrypt.compare(password, hash, (err, res) => {
                return (password !== user.password) ? done(null, false, { message: 'Incorrect password.' }) : done(null, user);
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

module.exports = passport;