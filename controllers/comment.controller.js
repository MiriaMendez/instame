const createError = require('http-errors');
const Post = require ('../models/post.model');
const Comment = require ('../models/comment.model');
const User = require('../models/user.model');


module.exports.create = (req, res, next) => {
    const comment = new Comment ({
        text: req.body.text,
        user: req.currentUser.id,
        post: req.body.post
    })

    comment.save()
    .then(comment => res.status(201).json(comment))
    .catch(next)
}