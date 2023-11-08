import Image from "next/image";
import { postTimeStampDisplay } from "@/lib/utils";
import Link from "next/link";

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-3 my-2 w-full">
      <Link href={`/users/${comment.user._id}`}>
        <Image
          className="min-w-12 w-12 h-12 rounded-full min-h-[3rem] min-w-[3rem]"
          height={100}
          width={100}
          src={
            comment.user.profilePicUrl
              ? comment.user.profilePicUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s"
          }
          alt="User Profile"
        />
      </Link>
      <div className="flex flex-col">
        <div>
          <span className="font-bold text-base">
            <Link
              href={`/users/${comment.user._id}`}
              className="dark:text-sky-400 dark:hover:text-sky-500 text-sky-600 hover:text-sky-700"
            >
              {comment.user.name}
            </Link>
          </span>
          {" • "}
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {postTimeStampDisplay(comment.timestamp)}
          </span>
        </div>
        <span className="break-all">{comment.content}</span>
      </div>
    </div>
  );
};

export default Comment;
