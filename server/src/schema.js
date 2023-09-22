const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    packages(sectionName: String!, currency: String!): [Package!]!
    classes(page: Int!, filter: String!): [Class!]!
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
`;

module.exports = typeDefs;
