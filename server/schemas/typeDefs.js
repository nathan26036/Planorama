// create the graphQL schema
const typeDefs = `
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

    type Event {
       _id: ID!
       title: String!
       description: String
       date: Int
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
        login(email: String!, password: String! ): Auth

        addRsvp(eventId: ID!, name: String!, description: String, plusOne:[String]): Rsvp
        addEvent(title: String!, description: String, date:Int ): Event
    }
`;

// export the graphQL schema
module.exports = typeDefs;