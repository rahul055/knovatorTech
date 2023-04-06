import mongoose from "mongoose";

const hostname = "0.0.0.0";

export const connectToMongoDB = async (httpServer, path) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      httpServer.listen(process.env.PORT, hostname, () => {
        console.log(
          `Server is now running on http://${hostname}:${process.env.PORT}${path}`
        );
      });
    })
    .catch((err) => console.log(err));
}

export const db = mongoose.connection;
