import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

export const QUERY_EVENTS = gql`
  query allEvents {
    events {
      _id
      title
      description
      date
      invited
    }
  }
`;

export const QUERY_RSVP = gql`
  query allRsvp {
    rsvp {
      _id
      name
      description
      plusOne
    }
  }
`;