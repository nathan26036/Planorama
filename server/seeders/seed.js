const db = require('../config/connection');
const { Profile, Event } = require('../models/');
const cleanDB = require('./cleanDB');
const profileSeeds = require('./profileSeeds.json');
const eventSeeds = require('./eventSeeds.json');

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles')
    await Profile.create(profileSeeds);
    await cleanDB('Event', 'events')
    await Event.create(eventSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
