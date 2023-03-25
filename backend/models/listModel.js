import mongoose from "mongoose";

const FSchema = mongoose.Schema({
  friend_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
});

const listSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  list: [FSchema],
});

const ListModel = mongoose.model("List", listSchema);

export default ListModel;
