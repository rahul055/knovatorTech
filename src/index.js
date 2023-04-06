import { ApolloServer, AuthenticationError } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import schema from "./social-app.graphql.js";
import { connectToMongoDB, db } from "./mongodb/mongo-transaction.service.js";
import passport from "./auth/passport.jwt.config.js";

(async function () {
  dotenv.config();
  const app = express();
  app.use(passport.initialize());
  const httpServer = createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const userPromise = new Promise((resolve, reject) => {
        passport.authenticate("jwt", { session: false }, (err, user) => {
          if (err || !user) {
            resolve(null);
          } else {
            resolve(user);
          }
        })(req);
      });
      const user = await userPromise;
      return {
        user,
        db,
      };
    },
    cors: {
      origin: "true",
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  connectToMongoDB(httpServer, server.graphqlPath);
})();
