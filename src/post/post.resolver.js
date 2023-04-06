import Post from "./post.schema.js";
import { createPost, updatePost } from "./post.service.js";
export default {
  Query: {
    listPosts: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const posts = await Post.find({ createdBy: context.user._id });
      return posts;
    },
    getPost: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const post = await Post.findOne({ _id: id, createdBy: context.user._id });
      return post;
    },
    getPostsByLocation: async (parent, { latitude, longitude }, context) => {
      try {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        const result = await Post.find({
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          createdBy: context.user._id,
        });
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPostCounts: async (parent, args, context) => {
      try {
        const activeCount = await Post.countDocuments({ active: true });
        const inactiveCount = await Post.countDocuments({ active: false });
        return { activeCount, inactiveCount };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createPost: async (parent, { post }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return createPost(post, context);
    },
    updatePost: async (parent, { id, post }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return updatePost(post, id, context);
    },

    deletePost: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const result = await Post.deleteOne({
        _id: id,
        createdBy: context.user._id,
      });
      if (!result) {
        throw new Error("Post not found");
      }
      return true;
    },
  },
};
