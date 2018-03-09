var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define structure of document
var blogSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    body: {
        type: 'String',
        required: true
    },
    author: {
        type: 'String',
        required: true
    },
    date: {
        type: 'Date',
        default: Date.now
    },
    likes: {
        type: 'Number'
    }
});

var BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;