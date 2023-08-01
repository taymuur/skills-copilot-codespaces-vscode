// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Comment = require('../models/Comment');

// Create a comment
router.post('/create', (req, res, next) => {
    const { comment, post_id } = req.body;
    const newComment = new Comment({
        comment,
        post_id
    });

    newComment.save()
        .then(comment => {
            res.status(201).json({
                message: 'Comment created successfully',
                comment
            });
        })
        .catch(err => console.log(err));
});

// Get all comments
router.get('/all', (req, res, next) => {
    Comment.find()
        .then(comments => {
            res.status(200).json({
                message: 'Get all comments',
                comments
            });
        })
        .catch(err => console.log(err));
});

// Get all comments from a post
router.get('/all/:post_id', (req, res, next) => {
    const { post_id } = req.params;
    Comment.find({ post_id })
        .then(comments => {
            res.status(200).json({
                message: 'Get all comments from a post',
                comments
            });
        })
        .catch(err => console.log(err));
});

// Delete a comment
router.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    Comment.findByIdAndDelete(id)
        .then(comment => {
            res.status(200).json({
                message: 'Comment deleted successfully',
                comment
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;