const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    packages(sectionName: String!, currency: String!): [Package!]!
    classes(page: Int!, filter: String!): [Class!]!
    purchase(promoCode: String): Purchase!
    goal: Goal!
    notifications: [Notifications!]!
  }

  type Mutation {
    purchase(promoCode: String): Purchase!
    setGoal(value: Int!): Goal!
  }

  type Class {
    id: String!
    page: Int!
    name: String!
    filter: String!
  }

  type Package {
    id: String!
    curriculum: Curriculum!
    price: Price!
  }

  type Curriculum {
    id: String!
    section: Section!
  }

  type Section {
    id: String!
    name: String!
  }

  type Price {
    forHuman: String!
    currency: String!
  }

  type Purchase {
    id: String!
    price: Int!
    description: String!
  }

  type Notifications {
    id: String!
    type: String!
    payload: NotificationPayload!
  }

  union NotificationPayload = ChallengeStarted | ChallengePrizeAchieved

  type ChallengeStarted {
    challengeName: String!
    title: String!
  }

  type ChallengePrizeAchieved {
    challengeName: String!
    value: Int!
    prize: ChallengePrize!
  }

  type ChallengePrize {
    name: String!
    value: Int!
  }

  type Goal {
    id: String!
    value: Int!
  }
`;

module.exports = typeDefs;
