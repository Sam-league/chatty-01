import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  seen: { type: Boolean, default: false },
});

const roomSchema = mongoose.Schema({
  user_1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chats: [chatSchema],
});

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
