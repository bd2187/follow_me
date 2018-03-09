var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        default: date.now
    },
    likes: {
        type: 'Number'
    }
});

var BlogPost = new Schema('BlogPost', blogSchema);

module.exports = BlogPost;