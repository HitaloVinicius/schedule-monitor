const jwt = require('jsonwebtoken');

module.exports = {
    async verifyJWT(req, res, next) {
        const autorization = req.headers.autorization;
        jwt.verify(autorization, SECRET_KEY, (err, decoder) => {
            if (err) {
                return res.status(401).json({massage:" Not Autorized"})
            }
            req.userIdJWt = decoder.userid;
            next();
        })
    }
}
