const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');

 router.post("/signup", userCtrl.signupUser);
 router.post("/login", userCtrl.loginUser);
 router.get("/logout", userCtrl.logoutUser);

module.exports = router;