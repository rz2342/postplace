import { Trash2Icon } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  const handleDelete = async (postId) => {
    console.log('hi')
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (res.status === 201 || res.status === 200) {
        location.reload();
      }
      else {
        console.log(res.status)
      }
  }

const DeletePostIcon = ({ postId }) => {
    return (
        <>
            <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash2Icon className='cursor-pointer' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(postId)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </>
    )
}

export default DeletePostIcon;