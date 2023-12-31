import User from "@/models/User";
import { NextResponse } from "next/server";
import connectToDB from "@/db.mjs";
import { cookies } from "next/headers";

import bcrypt from "bcryptjs";

// function to generate random usernames
function generateRandomUsername() {
  const adjectives = ["happy", "lucky", "sunny", "clever", "bright", "vivid"];
  const nouns = ["cat", "dog", "rabbit", "bird", "tiger", "lion"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  // Increase the range for the random number (e.g., 1 - 10000)
  const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1) + 1);

  return `${randomAdjective}_${randomNoun}_${randomNumber}`;
}

// saves visitor data into db and returns user object
export const POST = async () => {
  await connectToDB();
  const cookieStore = cookies();
  let username;
  if (cookieStore.get("visitor")) username = cookieStore.get("visitor").value;
  if (username) {
    // not first time visitor
    try {
      const regex = new RegExp(username, "i");
      const user = await User.findOne({ username: { $regex: regex } });
      return NextResponse.json({
        user: user,
      });
    } catch (e) {
      console.log("cant find existing visitor");
      throw new Error(e);
    }
  } else {
    // first time visitor
    console.log("first time visitor");
    const username = generateRandomUsername();
    const hashedPassword = bcrypt.hashSync(username, 10);
    try {
      const user = new User({
        name: username,
        username: username,
        password: hashedPassword,
      });
      await user.save();
      const headers = new Headers();
      // return cookie to remember visitor account
      headers.append("Set-Cookie", `visitor=${username}; Max-Age=10000000000`);
      const body = JSON.stringify({
        user: user,
      });
      return new Response(body, { headers: headers });
    } catch (err) {
      console.log("error: ", err);
      throw new Error("cant create new user");
    }
  }
};
