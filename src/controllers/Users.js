const User = require('../models/Users');
const UserModel = require('../models/Users');

module.exports = {

  async index(req, res) {
    try {

      const { page = 1 } = req.query;
      const limit = req.query.limit ? Number(req.query.limit) : 5;

      const count = await UserModel.countDocuments();
      const numberOfPages = Math.ceil(count / limit);

      const users = await UserModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .select('name');

      return res.status(200).json({ users, page, numberOfPages });

    } catch (error) {
      return res.status(500).json({ type: error.name, message: error.message });
    }
  },

  async filter(req, res) {
    try {

      const { id } = req.params;

      const user = await UserModel
        .findById(id)
        .populate('events');

      return res.status(200).json(user);

    } catch (error) {
      return res.status(500).json({ type: error.name, message: error.message });
    }
  },

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
      return res.status(500).json({ type: error.name, message: error.message });
    }
  },
  async destroy(req, res) {
    try {

      const { id } = req.params;
      const user = await UserModel.findById(id)
   
      if (!user) {
        throw { type: 'ValidationError', status: 404, message: 'User not found' };
      } 

      await UserModel.deleteOne({ _id: id }).populate('events');

      return res.status(200).json(user);
    } catch (error) {
      
      return res.status(500).json({ type: error.name, message: error.message });
    }
  }
};