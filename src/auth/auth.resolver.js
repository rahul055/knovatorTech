import User from "./auth.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-express";
import dotenv from "dotenv";
dotenv.config();

export default {
  Query: {
    me: (_, __, { req, passport }) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
          // If authentication fails, throw an error
          throw new AuthenticationError("Invalid token");
        }

        // If authentication succeeds, return the authenticated user
        return user;
      })(req);
    },
  },
  Mutation: {
    register: async (_, { userName, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return new UserInputError("Email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          email,
          password: hashedPassword,
          userName,
        });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return { token, user };
      } catch (error) {}
    },
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign({ sub: user.id },  process.env.JWT_SECRET);
      return { token, user };
    },
  },
};
