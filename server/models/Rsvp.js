const { Schema, model } = require('mongoose');

const rsvpSchema = new Schema({
  // referencing an 'Event' document. Each event is associated with a specific event
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
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