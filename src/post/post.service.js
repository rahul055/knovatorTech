import Post from "./post.schema.js";

export const createPost = async (post, context) => {
  try {
    const { longitude, latitude } = post.location;

    post.location = {
      type: "Point",
      coordinates: [longitude, latitude], // [longitude, latitude]
    };
    const now = new Date();
    const result = await new Post({
      ...post,
      createdBy: context.user._id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }).save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async (post, id, context) => {
  try {
    const { longitude, latitude } = post.location;

    post.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    const now = new Date();
    const result = await Post.findOneAndUpdate(
      { _id: id, createdBy: context.user._id },
      { $set: { ...post, updatedAt: now.toISOString() } },
      { returnOriginal: false }
    );
    if (!result) {
      throw new Error("Post not found");
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
