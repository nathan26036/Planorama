const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date
  } ,
  rsvp: [
    {
      type: String,
    },
  ],
});

const Event = model('Event', eventSchema);

module.exports = Event;