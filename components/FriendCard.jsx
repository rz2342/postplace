'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function FriendCard({ user }) {
    const router = useRouter();
    function handleClickProfilePic() {
          router.push(`/users/${JSON.parse(user)._id}`);
    }
    return (
        <div className="flex gap-3 items-center rounded-md p-4 border border-slate-400 dark:border-slate-800">
            <Button variant="outline" size="circle" className="relative" onClick={handleClickProfilePic}>
                <Image className="rounded-full" src={JSON.parse(user).profilePicUrl? JSON.parse(user).profilePicUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s'} fill />
            </Button >
            <span onClick={handleClickProfilePic} className="font-bold text-blue-500 cursor-pointer dark:text-blue-400">{JSON.parse(user).name}</span>
        </div>
    )
}