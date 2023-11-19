import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react";


const ProfileSection = ({user, feedType}) => {
    return (
        <div className="flex justify-between items-center max-w-2xl w-full">
            <div className="flex gap-4">
                <div className="relative w-[100px] h-[100px]">
                    <Image src={
                        user.profilePicUrl
                        ? user.profilePicUrl
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s"
                    } className='rounded-full' fill />
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <span className='font-bold text-4xl'>{user.name}</span>
                    <span>@{user.username}</span>
                </div>
            </div>
            <div className='self-end'>
                {feedType === 'profile' && <Button className='p-2'><Pencil />Edit</Button>}
            </div>
        </div>
    )
}

export default ProfileSection;