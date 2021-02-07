const UserModel = require('../models/Users');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

module.exports = {
    async auth(req, res) {
        const { username, password } = req.body;

        try {
            const user = await UserModel.findOne({ username, password });
            console.log(user);

            if (!user) {
                return res.status(401).json({ erro: 'ACCESS DENIED' });
            }
            const token = jwt.sign({ userId: user._id }, SECRET_KEY);

            return res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'error' });
        }
    }
};