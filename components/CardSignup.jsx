"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";


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
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
});

export default function CardSignup({ switchToSignup }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
      username: "",
      password: "",
    },
  });



  const handleSignup = async (values) => {
    setSignupError(false);
    setIsSubmitting(true);
    const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          password: values.password,
        }),
      });
    const data = await res.json();
    console.log("res is ", res);
    setIsSubmitting(false);
    if (res.status !== 201) {
        setSignupError(true);
    }
    else {
        setSignupError(false);
        const res = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: "/home", // should redirect to home page after successful signup
          });
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <Form {...form}>
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Sign up to PostPlace
                </h2>
            </div>
            <form onSubmit={form.handleSubmit(handleSignup)} className="mt-8 space-y-6 flex flex-col items-center justify-center">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input className="bg-gray-200 w-80 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded" placeholder="Enter name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input className="bg-gray-200 w-80 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded" placeholder="Enter username" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input className="bg-gray-200 dark:bg-gray-800 w-80 text-gray-900 dark:text-gray-100 p-3 rounded" placeholder="Enter password" type='password' disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {signupError && <div className='text-red-600'>Username already taken</div>}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                    <Button disabled={isSubmitting} className=" bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-700" type="submit">
                        Sign up
                    </Button>

                    <Button
                        disabled={isSubmitting}
                        type="button"
                        onClick={() => switchToSignup(false)}
                        className="bg-green-500 hover:bg-green-600 dark:bg-green-600 text-white dark:text-gray-200 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-700"
                    >
                        Log in
                    </Button>
                </div>
                <div className="text-sm">
                <a
                    disabled={isSubmitting}
                    className="font-medium cursor-pointer text-indigo-600 dark:text-purple-400 hover:text-indigo-500 dark:hover:text-purple-300"
                >
                    Log in as Guest
                </a>
                </div>
          </div>
            </form>
        </Form>
    </div>
  );
}
