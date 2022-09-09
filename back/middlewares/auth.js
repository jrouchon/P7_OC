const jwt = require('jsonwebtoken');
const tk = process.env.RD_TOKEN;

//recupération de l'id utilisateur du token d'identification du header (dans authorization après bearer)
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, tk); 
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
}