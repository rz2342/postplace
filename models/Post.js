import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
