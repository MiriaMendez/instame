const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = router;

router.post('/register', usersController.create)
router.get('/users/:id', usersController.profile)
router.patch('/users/:id/edit', usersController.edit)

router.post('/post/create', postController.create)
router.get('/post/:id', postController.show)
router.post('/post/:id/comments/create', commentController.create)
router.post('/post/:id/like', postController.like)

router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);