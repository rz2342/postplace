import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import connectToDB from "@/db.mjs";
import { NextResponse } from "next/server";

// get user's posts
export async function GET(req, context) {
  await connectToDB();
  const userId = context.params.userId;
  try {
    const currentUser = await User.findById(yourId).populate({
      path: "posts", // populate 'posts'
      populate: [
        {
          path: "user", // in each 'post', populate 'user'
        },
        {
          path: "comments", // in each 'post', populate 'comments'
          populate: {
            path: "user", // in each 'comment', populate 'user'
          },
        },
      ],
    });
    console.log("currentUser is ", currentUser);
    console.log("posts is ", currentUser.posts);
    return NextResponse.json({ posts: currentUser.posts });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 502 });
  }
}
