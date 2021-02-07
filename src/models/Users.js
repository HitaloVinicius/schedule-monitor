const connection = require('../config/database/connection');

const UserSchema = new connection.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 4
  },
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50,
    minlength: 8
  },
  password: {
    type: String,
    required: true,
    select: false,
    maxlength: 50,
    minlength: 8
  },
  events: [
    {
      type: connection.Schema.Types.ObjectId,
      ref: 'event'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = connection.model('user', UserSchema);

module.exports = User;