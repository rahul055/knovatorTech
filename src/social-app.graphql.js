import authResolver from "./auth/auth.resolver.js";
import { authTypeDefinition } from "./auth/auth.typedef.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { postTypeDefinition } from "./post/post.typedef.js";
import postResolver from "./post/post.resolver.js";
export const resolvers = {
  Query: {
    ...authResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...postResolver.Mutation,
  },
};

export const typeDefs = [...authTypeDefinition, ...postTypeDefinition];

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
