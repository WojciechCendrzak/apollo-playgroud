const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    packages(sectionName: String!, currency: String!): [Package!]!
    classes(page: Int!, filter: String!): [Class!]!
    purchase(promoCode: String): Purchase!
    goal: Goal!
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

  type Goal {
    id: String!
    value: Int!
  }
`;

module.exports = typeDefs;
