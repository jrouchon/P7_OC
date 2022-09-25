const Post = require('../models/posts.js');
const fs = require('fs');
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getPosts = (req, res) => {
    Post.find((err, posts) => {
        if (!err) {
          return res.status(200).json(posts);
        } else {
          return res.status(404).json(err);
        }
      }).sort({ "date" : -1});
}; 


exports.createPost = (req, res) => {
    const post = new Post({
      userId: req.auth.userId,
      userName: req.body.name,
      text: req.body.text,
      imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
      date: new Date().toISOString()
    });
    post
      .save()
      .then(() => res.status(201).json(post))
      .catch((err) => res.status(500).json({err}));
}

exports.modifyPost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  const {id} = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Ce post n'existe pas." });
  }

  if(req.body.text === null && req.file === null) {
    return res.status(404).json({ message: "Le post ne peut être vide" });
  }

  await Post.findById(id)
  .then((post) => {
      User.findById(userId)
        .then((currentUser) => {
          if (currentUser.id === post.userId || currentUser.role === "admin") {
            const text = req.body.text;
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              const updatedPost = {
                userId: currentUser.id,
                text: text ? text : "",
                imageUrl: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`: "",
              }
              post.updateOne(updatedPost)
                  .then(() => res.status(200).json({ message: "Post modifié" }))
                  .catch((error) => res.status(400).json({ error }));
          })
          } else {
            res.status(401).json({message : "Non autorisé."})
          }
      })
  })
  .catch(err => res.status(500).json({error: err}))
};

exports.deletePost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Ce post n'existe pas." });
  }

  await Post.findById(id)
      .then((post) => {
        User.findById(userId)
            .then((currentUser) => {
              if (post.userId === currentUser.id || currentUser.role === "admin") {
                const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({ _id: id })
                      .then(() => res.status(200).json({ message: "Post supprimee !" }))
                      .catch((error) => res.status(400).json({ error }));
                });
              }
              else {
                res.status(403).json({message : "Non autorisé."})
              }
              
            })
          
      });
};


exports.likePost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;

  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Ce post n'existe pas."});
  }

  await Post.findById(id)
    .then((post) => {
        if (req.body.like === 1) {
          const userLikeIndex = post.usersLiked.findIndex(
            (user) => user == userId
          );
          if(userLikeIndex !== -1) {
            post.usersLiked.splice(userLikeIndex, 1);
            post.likes--
            res.status(202).json({message : "Retrait du like"})
          } else {
            post.usersLiked.push(userId)
            post.likes++;
            res.status(200).json({message : "Publication likée"})
          }
          
        }
        
        Post.updateOne({_id : id}, {$set : { likes: post.likes, usersLiked: post.usersLiked}}, {upsert: true, strict: false})
        .then((res) => {return res})
    })

    
};