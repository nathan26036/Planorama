// create the graphQL schema
const typeDefs = `
scalar Date
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
        events: [Event]
    }

    type Rsvp {
        _id: ID!
        name: String!
        description: String
        plusOne: [String]
    }
    scalar Date
    
    type Event {
       _id: ID!
       title: String!
       description: String
       date: Date
       rsvp:[Rsvp] 
    }

    type Auth {
        token: ID!
        profile: Profile 
    }

    type Query {
        events: [Event]
        profiles: [Profile]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addProfile(name: String!, email: String!, password: String!): Auth
        addRsvp(eventId: ID!, name: String!, description: String, plusOne:[String]): Rsvp
        addEvent(title: String!, description: String, date: Date ): Event
    }
`;

// export the graphQL schema
module.exports = typeDefs;