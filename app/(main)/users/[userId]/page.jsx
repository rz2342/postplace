import FeedList from "@/components/FeedList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import connectToDB from "@/db.mjs";

const getUserPosts = async (userId) => {
  await connectToDB();
  const currentUser = await User.findById(userId).populate({
    path: "posts", // populate 'posts'
    options: { sort: { _id: -1 } }, // sort posts by '_id' in descending order
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
  return currentUser.posts;
};

const Page = async ({ params }) => {
  await connectToDB();
  const session = await getServerSession(authOptions);
  const posts = await getUserPosts(params.userId);
  const user = await User.findById(session.user.userId);
  const feedUser = await User.findById(params.userId);
  return (
    <>
      <FeedList
        user={user}
        posts={posts}
        feedType={"user"}
        feedUser={feedUser}
      />
    </>
  );
};

export default Page;
