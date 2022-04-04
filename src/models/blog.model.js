const mongoose = require('mongoose');

let Blog = mongoose.model('Blog',{
    titre:String,
    description:String,
    image:String,
    content:String
})

module.exports = Blog;