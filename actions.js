'use server';

import connectToDB from "./db.mjs";
import User from "./models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function toggleDarkDB() {
    const session = await getServerSession(authOptions);
    await connectToDB();
    const user = await User.findById(session.user.userId);
    const update = !user.dark;
    await User.findByIdAndUpdate(session.user.userId, { dark: update });
  }
