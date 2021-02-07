const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

module.exports = {
    async verifyJWT(req, res, next) {
        const [, authorization] = req.headers.authorization.split(' ');

        jwt.verify(authorization, SECRET_KEY, (err, decoder) => {

            if (err) {
                return res.status(401).json({ massage: " Not Authorized" });
            }

            req.userId = decoder.userId;
            next();
        });
    }
};
