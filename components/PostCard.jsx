import Image from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";

const PostCard = ({ post, profileImage }) => {
    function postTimeStampDisplay() {
        const postTimestamp = DateTime.fromISO(post.timestamp);
        const nowTimestamp = Date.now();
        const timeDiffInMinutes = Math.ceil(
          (nowTimestamp - postTimestamp) / 1000 / 60,
        );
        if (timeDiffInMinutes < 60) {
          return `${timeDiffInMinutes}m`;
        }
        const timeDiffInHours = Math.ceil(timeDiffInMinutes / 60);
        if (timeDiffInHours < 24) {
          return `${timeDiffInHours}h`;
        }
        const timeDiffInDays = Math.ceil(timeDiffInHours / 24);
        if (timeDiffInDays < 5) {
          return `${timeDiffInDays}d`;
        }
        return DateTime.fromISO(post.timestamp).toLocaleString(
          DateTime.DATETIME_SHORT,
        );
      }
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-md shadow-md flex flex-col gap-4 max-w-2xl w-full">
      <div className="flex items-start space-x-3">
        <Link href={`/users/${post.user._id}`}><Image className="w-12 h-12 rounded-full" height={100} width={100} src={profileImage? profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s'} alt="User Profile" /></Link>
        <div className="text-sm space-y-1">
          <div className='font-bold text-base'><Link href={`/users/${post.user._id}`} className="dark:text-sky-400 dark:hover:text-sky-500 text-sky-600 hover:text-sky-700">{post.user.username}</Link></div>
          <div className="text-gray-500 dark:text-gray-300">{postTimeStampDisplay(post.timestamp)}</div>
        </div>
      </div>
      <div className="mt-3 text-base text-gray-700 dark:text-gray-300">
        {post.content}
      </div>
      <div className="text-center relative">
        <Separator className='dark:bg-slate-600 bg-slate-300 m-1' />
            <label className="" htmlFor="comment">
                <div className='text-slate-600 text-md hover:bg-slate-700 p-1 cursor-pointer rounded-md relative left-1'>Comment</div>
            </label>
        <Separator className='dark:bg-slate-600 bg-slate-300 m-1' />
        <div className="flex gap-3 my-2">
        <Image className="w-12 h-12 rounded-full" height={100} width={100} src={profileImage? profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s'} alt="User Profile" />
            <Textarea id='comment' className='comment text-black rounded-md bg-gray-100 focus:outline-none w-full h-1' />

        </div>

      </div>
    </div>
  );
};

export default PostCard;