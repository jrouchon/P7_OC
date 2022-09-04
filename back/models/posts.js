const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postId: { type: String, required: true }, // required?
    userId: { type: String, required: true },
    name: { type: String, required: true },
    text: { type: String },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] },
    date: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Post', postSchema);