// create the graphQL schema
const typeDefs = `
    type Profile {
        _id: ID!
        name: String!
        email: String!
        password: String!
        events: [Event]
    }

    type Rsvp {
        _id: ID!
        name: String!
        description: String
        plusOne: [String]
    }

    type Event {
       _id: ID!
       title: String!
       description: String
       date: Int
       rsvp:[Rsvp] 
    }

    type Query {
        events: [Event]
        profiles: [Profile]
    }

    type Mutation {
        createProfile(name: String!, email: String!): Profile
        createRsvp(eventId: ID!, name: String!, description: String, plusOne:[String]): Rsvp
        createEvent(title: String!, description: String, date:Int ): Event
    }
`;

// export the graphQL schema
module.exports = typeDefs;