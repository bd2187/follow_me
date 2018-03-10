const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

router.post(
    '/register/:firstName/:lastName/:username/:password/:email/:confirmPassword',
    (req, res) => {
    const { firstName, lastName, username, password, email, confirmPassword } = req.params;
    const user = new User({
        firstName,
        lastName,
        username,
        password,
        email,
        confirmPassword
    });

    user.save((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error.');
        } else { 
            res.json({
                status: 'success',
                user
            });
        }
    });
});

router.post('/login/:id', (req, res) => {

});

module.exports = router;