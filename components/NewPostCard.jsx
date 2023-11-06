'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image";


const formSchema = z.object({
    content: z.string().min(1, {
      message: "Post cannot be empty",
    }),
  });

const NewPostCard = ({ profileImage, username }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          content: "",
        },
      });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });
    if (res.status === 201) {
      location.reload();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md flex gap-3 max-w-2xl relative w-full">
        <Image className="w-12 h-12 rounded-full" src={profileImage? profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzykHG9uAxSMQWR-w0PL11LVzi2WD9IcXruJNMu0WMWQ&s'} alt="User Profile" height={100} width={100} />

        <Dialog>
            <DialogTrigger asChild>
                <Button className="form-textarea mt-1 block w-full rounded-md bg-gray-100 focus:outline-none dark:hover:bg-slate-300 hover:bg-slate-200 text-left text-gray-500">
                    {`What's on your mind, ${username}?`}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        Create a post
                    </DialogTitle>
                </DialogHeader>
    <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex gap-3 flex-col"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                    <Textarea
                            id='new-post'
                            className="form-textarea mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none" 
                            rows="3" 
                            disabled={isSubmitting}
                            {...field}
                        />
                </FormControl>
              </FormItem>
            )}
          />
        <DialogFooter>
            <div className="flex items-center space-x-4">
              <Button
                disabled={isSubmitting}
                className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-400 hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none"
                type="submit"
              >
                Post
              </Button>

            </div>
        </DialogFooter>
                </form>
      </Form>
      </DialogContent>
                    </Dialog>
    </div>
  );
};

export default NewPostCard;