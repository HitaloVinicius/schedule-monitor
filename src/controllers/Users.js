const UserModel = require('../models/Users');

module.exports = {
  async create(req, res) {
    try {
      const { name, username, password } = req.body;

      await UserModel.create({
        name,
        username,
        password
      });

      return res.status(200).json({ message: 'success' });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'error' });
    }

  },

};