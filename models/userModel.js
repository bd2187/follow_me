var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define structure of document
var userSchema = new Schema({
    firstName: {
        type: 'String',
        required: true
    },
    lastName: {
        type: 'String',
        required: true
    },
    username: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    date: {
        type: 'Date',
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;