"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CardLogin from "@/components/CardLogin";
import CardSignup from "@/components/CardSignup";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

const SignIn = () => {
  const [signupCard, setSignupCard] = useState(false);
  const [isDark, setIsDark] = useState();

  useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark === "false") {
      document.documentElement.classList.remove("dark");
    }
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <div>
      <div className="fixed z-50 bg-gray-800 dark:bg-gray-800 w-full p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">PostPlace</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              onCheckedChange={() => {
                document.documentElement.classList.toggle("dark");
                localStorage.setItem(
                  "dark",
                  document.documentElement.classList.contains("dark"),
                );
                setIsDark((prev) => !prev);
              }}
              checked={isDark}
            />
            <Label htmlFor="dark-mode">
              {isDark ? <Moon /> : <Sun className="stroke-white" />}
            </Label>
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
