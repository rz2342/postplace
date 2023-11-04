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

const User = models.User || model("User", UserSchema);

export default User;
