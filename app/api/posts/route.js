import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import connectToDB from "@/db.mjs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserCircle } from "lucide-react";

export async function GET() {
    await connectToDB();
    try {
        const posts = await Post.find().populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user',
            }
        });
        return NextResponse.json({ posts });
    }
    catch(err) {
        console.log(err);
        return NextResponse.json({ error: err }, {status: 502});
    }
}

export async function POST(req) {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const data = await req.json();
    const user = await User.findById(session.user.userId);
    try {
        const post = new Post({
            content: data.content,
            user: user._id
        });
        await post.save();
        user.posts.push(post);
        return NextResponse.json({ post }, { status: 201 });
    }
    catch(err) {
        console.log('error creating a post: ', err);
        return NextResponse.json({error: err}, {status: 501});
    }

}