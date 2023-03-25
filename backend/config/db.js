import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://AbhishekTamang:9041415907@cluster0.jiflw.mongodb.net/chatty?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log(err.message));
};

export default connectDB;
