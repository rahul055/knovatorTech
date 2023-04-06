import { gql } from "apollo-server-express";

const authTypeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

const authQueries = gql`
  type Query {
    me: User
  }
`;
const authMutations = gql`
  type Mutation {
    register(userName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

export const authTypeDefinition = [authTypeDefs, authQueries, authMutations];
