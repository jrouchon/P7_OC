const Post = require('../models/posts.js');
const fs = require('fs');
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const tk = process.env.RD_TOKEN;

exports.getPosts = (req, res) => {
    Post.find((err, posts) => {
        if (!err) {
          return res.status(200).json(posts);
        } else {
          return res.status(404).json(err);
        }
      }).sort({ "createdAt" : -1});
};

    /*userId: { type: String, required: true },
    userName: { type: String, required: true }, // 
    text: { type: String },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] },
    date: { type: Date, default: new Date() }*/

exports.createPost = (req, res) => {
    //console.log('createPost req body : ', req.body);

    const post = new Post({
      userId: req.auth.userId,
      userName: req.body.name,
      text: req.body.text,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      date: new Date().toISOString()
    });
    post
      .save()
      .then(() => res.status(201).json(post))
      .catch((err) => res.status(500).json({err}));
}

