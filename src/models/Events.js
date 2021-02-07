const connection = require('../config/database/connection');

const EventSchema = new connection.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 1
  },
  description: {
    type: String,
    required: false,
    maxlength: 200,
    minlength: 1
  },
  scheduled_to: {
    type: Date,
    required: false
  },
  user: {
    type: connection.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = connection.model('event', EventSchema);

module.exports = Event;