const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({ message: 'Votre requ�te a bien �t� re�ue !' });
});

module.exports = app;