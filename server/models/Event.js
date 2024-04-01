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
    type: Date,
    required: true,
  } ,
  rsvp: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rsvp',
    },
  ],
});

const Event = model('Event', eventSchema);

module.exports = Event;