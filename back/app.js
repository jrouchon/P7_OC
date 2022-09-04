const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const userRoutes = require('./routes/user.js');
const postsRoutes = require('./routes/posts.js');

//mongodb connect
const dbuser = process.env.DB_USER
const dbpasswd = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://${dbuser}:${dbpasswd}@cluster0.v0vdoa1.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion a MongoDB reussie !'))
    .catch(() => console.log('Connexion a MongoDB echouee !'));


//middleware cors_handling bodyparser
app.use(cors())
app.use(express.json());

// testing server
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

//routes
// app.use('/api/auth', userRoutes);
// app.use('/api/posts', postsRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;