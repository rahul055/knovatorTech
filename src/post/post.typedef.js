import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    body: String!
    createdBy: ID!
    active: Boolean!
    location: Location!
    createdAt: String!
    updatedAt: String!
  }

  input PostInput {
    title: String!
    body: String!
    active: Boolean!
    location: LocationInput!
  }

  input LocationInput {
    latitude: Float!
    longitude: Float!
  }

  type Location {
    type: String!
    coordinates: [Float!]!
  }
  type PostCount {
    activeCount: Int!
    inactiveCount: Int!
  }
`;

const postQueries = gql`
  type Query {
    listPosts: [Post!]!
    getPost(id: ID!): Post
    getPostsByLocation(latitude: Float, longitude: Float): [Post!]!
    getPostCounts: PostCount!
  }
`;

const postMutations = gql`
  type Mutation {
    createPost(post: PostInput!): Post!
    updatePost(id: ID!, post: PostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;

export const postTypeDefinition = [postTypeDefs, postQueries, postMutations];
