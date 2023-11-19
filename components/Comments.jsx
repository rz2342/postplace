import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Comment from "./Comment";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    comment: z.string().refine(
      (value) => {
        // trim the value before checking its length
        const trimmedValue = value.trim();
        return trimmedValue.length >= 1;
      },
      {
        message: "Comment cannot be empty",
      },
    ),
  })
  .transform((value) => ({
    ...value,
    // trim the comment after validation
    comment: value.comment.trim(),
  }));

const Comments = ({ postId, user, postComments, setPostComments }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleComment = async (values) => {
    setIsSubmitting(true);
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: values.comment,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      setPostComments([
        // put new comment before prev comments so most recent ones show first
        data.comment,
        ...postComments,
      ]);
      form.reset();
    } else {
      alert(data.error);
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Form {...form}>
        <form
          className="text-center relative"
          onSubmit={form.handleSubmit(handleComment)}
        >
          <Separator className="dark:bg-slate-600 bg-slate-300 m-1" />
          <FormLabel htmlFor={`comment_${postId}`}>
            <div className="dark:text-slate-500 text-md dark:hover:bg-slate-700 text-slate-400 hover:bg-slate-200 p-2 cursor-pointer rounded-md relative left-1 transition-colors">
              Comment
            </div>
          </FormLabel>
          <Separator className="dark:bg-slate-600 bg-slate-300 m-1" />
          <div className="flex gap-2 my-2">
            <Image
              className="w-12 h-12 rounded-full"
              height={100}
              width={100}
              src={
                user.profilePicUrl
                  ? user.profilePicUrl
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s"
              }
              alt="User Profile"
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      id={`comment_${postId}`}
                      {...field}
                      className="comment text-black rounded-md bg-gray-100 focus:outline-none w-full h-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="transition-colors p-2 stroke-black dark:stroke-white rounded-r-full hover:bg-slate-200 dark:hover:bg-slate-700 self-center"
            >
              <SendHorizontal className="stroke-inherit" />
            </button>
          </div>
        </form>
      </Form>
      {postComments?.map((comment) => (
        <Comment comment={comment} user={user} key={comment._id} />
      ))}
    </>
  );
};

export default Comments;
