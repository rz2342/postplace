import NewPostCard from "@/components/NewPostCard";
import FeedList from "@/components/FeedList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-10 items-center py-10">
      <NewPostCard profileImage={session.user.profilePicUrl} username={session.user.username} />
      <FeedList profileImage={session.user.profilePicUrl} />
    </div>
  )
};

export default Page;
