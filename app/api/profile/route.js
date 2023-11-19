import { NextResponse } from "next/server";
import connectToDB from "@/db.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import sanitize from "mongo-sanitize";

export async function PUT(req) {
  await connectToDB();
  const session = await getServerSession(authOptions);
  const data = await req.json();
  const sanitizedData = {
    name: sanitize(data.name),
    url: sanitize(data.url),
  };
  console.log("sanitized is ", sanitizedData);
  try {
    if (sanitizedData.name.trim()) {
      const user = await User.findByIdAndUpdate(session.user.userId, {
        name: sanitizedData.name.trim(),
      });
    }
    if (sanitizedData.url.trim()) {
      const user = await User.findByIdAndUpdate(session.user.userId, {
        profilePicUrl: sanitizedData.url.trim(),
      });
    }
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (err) {
    console.log("error updating profile: ", err);
    return NextResponse.json({ error: err }, { status: 502 });
  }
}
