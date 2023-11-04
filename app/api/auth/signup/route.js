import User from "@/models/User";
import { NextResponse } from "next/server";
import connectToDB from "@/db.mjs";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDB();
  const reqData = await req.json();
  console.log("we are in POST signup route. req is ", reqData);
  try {
    const user = await User.findOne({ username: reqData.username });
    if (user) {
      console.log("username alredy exists in database");
      return NextResponse.json({
        error: 'username already taken',
      }, { status: 400 });
    }
    // username available, save user to db
    const hashedPassword = bcrypt.hashSync(reqData.password, 10);
    try {
      console.log("trying to create and save user to db now after hashing");
      const user = new User({
        name: reqData.name,
        username: reqData.username,
        password: hashedPassword,
      });
      await user.save();
      console.log("we saved the new user to db. returning status 201 now");
      return NextResponse.json({ user }, { status: 201 });
    } catch (err) {
      throw new Error(
        "could create and save user to db for some reaosn: ",
        err,
      );
    }
  } catch (e) {
    console.log(e);
  }
}