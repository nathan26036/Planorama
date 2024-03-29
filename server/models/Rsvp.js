const { Schema, model } = require('mongoose');

const rsvpSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  plusOne: [
    {
      type: String,
    },
  ],
});

const Rsvp = model('Rsvp', rsvpSchema);

module.exports = Rsvp;