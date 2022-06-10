const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Content 未填寫']
        },
        image: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now,
            select: false
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: [true, 'User 未填寫']
        },
    },
    {
        versionKey: false
    }
);

const Post = mongoose.model('post', postSchema);

module.exports = Post;