const EventModel = require('../models/Events');
const UserModel = require('../models/Users');
const { Types } = require('mongoose');
const axios = require('axios').default;
const { URL_SERV_SCHEDULE, PORT_SERV_SCHEDULE } = process.env

module.exports = {
  async create(req, res) {
    try {

      const { title, description, scheduled_to, testeID } = req.body;

      const userId = req.userId;

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

      //enviando agendamento
      axios.post(`${URL_SERV_SCHEDULE}:${PORT_SERV_SCHEDULE}`, {
        id: event._id,
        title,
        scheduled_to,
        description
      });

      return res.status(200).json({ message: 'success' });

    } catch (error) {
      return res.status(error.status || 500).json({ type: error.name, message: error.message });
    }
  },

  async destroy(req, res) {
    try {

      const { id } = req.params;
      const userId = req.userId;

      const user = await UserModel.findById(userId);
      
      if (!user) {
        throw { type: 'ValidationError', status: 404, message: 'User not found' };
      }

      const index = user.events.indexOf(id);
      
      if (index == -1) {
        throw { type: 'ValidationError', status: 404, message: 'Event not found' };
      }

      await EventModel.deleteOne({
        _id: id,
        user: userId
      });

      user.events.splice(index, 1);
      user.save();

      //delete event de agendamentos
      axios.delete(`${URL_SERV_SCHEDULE}:${PORT_SERV_SCHEDULE}/${id}`);

      return res.status(200).json({ message: 'success' });
    } catch (error) {

      return res.status(error.status || 500).json({ type: error.name, message: error.message });
    }
  },

  async update(req, res) {
    try {

      const { id } = req.params;
      const { scheduled_to } = req.body;
      const userId = req.userId;

      const user = await UserModel.findById(userId);
      
      if (!user) {
        throw { type: 'ValidationError', status: 404, message: 'User not found' };
      }

      const index = user.events.indexOf(id);
      
      if (index == -1) {
        throw { type: 'ValidationError', status: 404, message: 'Event not found' };
      }

      await EventModel.updateOne(
        { _id: `${id}` }, {
        $set: { scheduled_to }
      });

      //editar o agendamento
      axios.put(`${URL_SERV_SCHEDULE}:${PORT_SERV_SCHEDULE}/${id}`, { scheduled_to });

      return res.status(200).json({ message: 'success' });

    } catch (error) {

      return res.status(error.status || 500).json({ type: error.name, message: error.message });
    }
  },
};