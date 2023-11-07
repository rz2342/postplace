import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
