'use client';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import PostCard from "./PostCard";

const FeedList = ({ profileImage }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            console.log('data is ', data.posts)
            setPosts(data.posts);
        }
        setIsLoading(true);
        getPosts();
        setIsLoading(false);
    }, [])
    const allPosts = posts.map(postObj => <PostCard key={postObj._id} post={postObj} profileImage={profileImage? profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s'} />)
    if (isLoading) {
        return <Loader />
    }
    else if (allPosts.length === 0) {
        return <>No posts yet...</>
    }
    return (
        <>
            {allPosts}
        </>
    )
}

export default FeedList;