const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/posts.js');

 router.get("/", auth, postCtrl.getPosts);
 router.post("/", auth, multer, postCtrl.createPost);
 router.put("/:id", auth, multer, postCtrl.modifyPost);
// router.delete("/:id", auth, postCtrl.deletePost);
 router.patch("/:id/like", auth, postCtrl.likePost);

module.exports = router;