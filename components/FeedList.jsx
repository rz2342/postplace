"use client";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import PostCard from "./PostCard";

const FeedList = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts);
      setIsLoading(false);
    };
    getPosts();
  }, []);
  const allPosts = posts.map((postObj) => (
    <PostCard key={postObj._id} post={postObj} user={user} />
  ));
  if (isLoading) {
    return <Loader />;
  } else if (allPosts.length === 0) {
    return <>No posts yet...</>;
  }
  return <>{allPosts}</>;
};

export default FeedList;
