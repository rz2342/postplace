import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicUrl: { type: String },
  password: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const commentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    timestamp: { type: Date, default: Date.now },
});

const PostSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});
