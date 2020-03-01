const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = router;

router.post('/register', authMiddleware.isAuthenticated, usersController.create)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.profile)
router.patch('/users/:id/edit', authMiddleware.isAuthenticated, usersController.edit)
router.get('/users/:id/posts', authMiddleware.isAuthenticated, postController.list)
router.get('/posts', authMiddleware.isAuthenticated, postController.all)
router.post('/post/create', authMiddleware.isAuthenticated, postController.create)
router.get('/post/:id', authMiddleware.isAuthenticated, postController.show)
router.post('/post/:id/comments/create', authMiddleware.isAuthenticated, commentController.create)
router.post('/post/:id/like', authMiddleware.isAuthenticated, postController.like)

router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);