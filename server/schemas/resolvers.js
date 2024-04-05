// import models
const { Event, Profile, Rsvp } = require('../models');
const { signToken, AuthenticationError } = require ('../utils/auth');
const { GraphQLScalarType } = require ('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
})

// defining resolvers
const resolvers = {
    Date: dateScalar,
    Query: {

        // create query resolvers events and profiles
        // not including RSVPs becuase they don't need to be fetched every time
        events: async () => {
            return Event.find({});
            // the following section of code can replace this return statement if we want to include all of the RSVPs
            // return Event.find({}).populate('rsvps');
        },
        profiles: async () => {
            return Profile.find({});
        },
    },
    // define mutation resolvers for creating new events, profiles and RSVPs
    Mutation: {
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne( { email });
            if (!profile) {
                throw AuthenticationError;
            }
            const correctPw = await profile.isCorrectPassword(password);
            if(!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(profile);
            return { token, profile };
        },
        // creating a new event document. Passing in title, description and date
        addEvent: async (parent, { title, description, date }) => {
            const event = await Event.create({ title, description, date });
            return event;
        },
        // creating a new profile document. Passing in the name and email
        addProfile: async (parent, { name, email, password }) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);
            return {token, profile};
        },
        // creating a new RSVP document. Pushing eventId, name, description and plusOne
        // if someone RSVPs then we update the Event document
        addRsvp: async (parent, { eventId, name, description, plusOne }) => {
            const rsvp = await Rsvp.create({ eventId, name, description, plusOne });

            await Event.findByIdAndUpdate(eventId, { $push: { rsvp: rsvp } });

            return rsvp;
        },
    },
};

// exporting resolvers
module.exports = resolvers;