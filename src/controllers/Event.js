const EventModel = require('../models/Events');
const UserModel = require('../models/Users');
const { Types } = require('mongoose');

module.exports = {
  async create(req, res) {
    try {

      const { title, description, scheduled_to } = req.body;

      const userId = '602029ad2cc7a67c4469b568'; //! substituir pelo id do token

      if (!Types.ObjectId.isValid(userId)) {
        throw { type: 'ValidationError', status: 404, message: 'Invalid Id' };
      }

      const user = await UserModel.findById(userId).populate('event');

      if (!user) {
        throw { type: 'ValidationError', status: 404, message: 'User not found' };
      }

      const event = await EventModel.create({
        title,
        description,
        scheduled_to,
        user: userId
      });

      user.events.push(event._id);
      user.save();

      return res.status(200).json({ message: 'success' });

    } catch (error) {
      return res.status(error.status || 500).json({ type: error.name, message: error.message });
    }
  },

  async destroy(req, res) {
    try {

      const { id } = req.params;
      const userId = '602029ad2cc7a67c4469b568'; //! substituir pelo id do token

      await EventModel.deleteOne({
        _id: id,
        user: userId
      });

      const user = await UserModel.findById(userId);

      if (!user) {
        throw { type: 'ValidationError', status: 404, message: 'User not found' };
      }

      const index = user.events.indexOf(id);

      if (index == -1) {
        throw { type: 'ValidationError', status: 404, message: 'Event not found' };
      }

      user.events.splice(index, 1);
      user.save();

      return res.status(200).json({ message: 'success' });

    } catch (error) {
      return res.status(error.status || 500).json({ type: error.name, message: error.message });

    }
  }
};