"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CardLogin from "@/components/CardLogin";
import CardSignup from "@/components/CardSignup";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { isDarkMode, toggleDarkMode } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";



const SignIn = () => {
  const [signupCard, setSignupCard] = useState(false);
  const { data: session, status } = useSession();
  const [isDark, setIsDark] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      console.log("detected ur already logged in, redirecting to home page");
      return router.push("/home");
    }
  }, [router, session]);

  useEffect(() => {
    const dark = localStorage.getItem('dark');
    if (dark === 'true') {
      document.documentElement.classList.add('dark');
    }
    setIsDark(isDarkMode());
  }, [])

  return (
    <div>
      <div className="fixed z-50 bg-gray-800 dark:bg-gray-800 w-full p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        PostPlace
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="dark-mode" onCheckedChange={() => {
            toggleDarkMode();
            setIsDark((prev) => !prev)
          }} checked={isDark} />
          <Label htmlFor="dark-mode">{isDark ? <Moon /> : <Sun className='stroke-white' />}</Label>
      </div>
      </div>
    </div>
      {signupCard ? (
        <CardSignup switchToSignup={setSignupCard} />
      ) : (
        <CardLogin switchToSignup={setSignupCard} />
      )}
    </div>
  );
};

export default SignIn;
