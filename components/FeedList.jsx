import PostCard from "./PostCard";
import NewPostCard from "./NewPostCard";
import ProfileSection from "./ProfileSection";

const FeedList = ({ user, posts, feedType }) => {
  const allPosts = posts.map((postObj) => (
    <PostCard key={postObj._id} post={JSON.stringify(postObj)} user={JSON.stringify(user)} />
  ));
  return (
    <div className="flex flex-col gap-6 items-center py-10">
      {feedType != 'all' && <ProfileSection user={user} feedType={feedType} />}
      {feedType != 'user' && (
      <NewPostCard
        profileImage={user.profilePicUrl}
        user={JSON.stringify(user)}
      />)}
      <div className='text-2xl max-w-2xl relative w-full'>{feedType === 'user'? `${user.username}'s posts`: feedType === 'profile'? 'Your posts' : 'All posts'}</div>
      <div className="flex flex-col gap-10 items-center py-1 max-w-2xl w-full">
        {allPosts.length === 0? <>No posts yet...</> : <>{allPosts}</>}
      </div>
    </div>
  );
};

export default FeedList;
