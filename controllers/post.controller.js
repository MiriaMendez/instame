const Post = require ('../models/post.model')
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    const post = new Post ({
        user: req.currentUser.id,
        body: req.body.body,
        img: req.body.img

    })

    post.save()
    .then(post => res.status(201).json(post))
    .catch(next)
}

module.exports.show = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        if (post) {
            res.json(post)
        } else {
            throw createError(404, 'Post no found')
        }
    })
    .catch(next)
}  