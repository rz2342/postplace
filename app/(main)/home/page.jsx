import FeedList from "@/components/FeedList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "@/db.mjs";
import User from "@/models/User";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

const getAllPosts = async () => {
  await connectToDB();
  const posts = await Post.find()
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .sort({ _id: -1 });
  return posts;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = await User.findById(session.user.userId);
  let posts, error;
  try {
    posts = await getAllPosts();
  } catch (err) {
    error = err;
  }
  return (
    <>
      {error ? (
        `Error retrieving posts: ${error}`
      ) : (
        <FeedList user={user} posts={posts} feedType={"all"} />
      )}
    </>
  );
};

export default Page;
