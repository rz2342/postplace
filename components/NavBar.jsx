"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { isDarkMode, toggleDarkMode } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authuserData, setAuthuserData] = useState({});
  const [isDark, setIsDark] = useState();

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams([["filter", search]]);
    router.push(`/search/?${params.toString()}`);
    buttonRef.current.click();
  }

  // Fetch authuser from session.user.userId and pass along the authuserData
  // useEffect(() => {
  //   async function fetchAuthuser() {
  //     const res = await fetch(`/api/users/${session.user.userId}`);
  //     const data = await res.json();
  //     setAuthuserData(data.user);
  //   }
  //   if (status === "loading") return;
  //   if (session) {
  //     fetchAuthuser();
  //   } else {
  //     return router.push("/");
  //   }
  // }, [session, router, status]);

  useEffect(() => {
    const dark = localStorage.getItem('dark');
    if (dark === 'true') {
      document.documentElement.classList.add('dark');
    }
    setIsDark(isDarkMode());
  }, [])

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div class="bg-white dark:bg-gray-800 w-full p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        PostPlace
      </h1>
      <div class="flex items-center">
        <button class="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button Text
        </button>
        <div className="flex items-center space-x-2">
          <Switch id="dark-mode" onCheckedChange={() => {
            toggleDarkMode();
            setIsDark((prev) => !prev)
          }} checked={isDark} />
          <Label htmlFor="dark-mode">{isDark ? <Moon /> : <Sun />}</Label>
      </div>
      </div>
    </div>
  );
}
