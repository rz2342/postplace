"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { toggleDarkDB } from "@/actions";

export default function NavBar({ profileImage }) {
  const [isDark, setIsDark] = useState(false);

  // function handleSearchSubmit(e) {
  //   e.preventDefault();
  //   const params = new URLSearchParams([["filter", search]]);
  //   router.push(`/search/?${params.toString()}`);
  //   buttonRef.current.click();
  // }

  useEffect(() => {
    // set correct toggle
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggle = async () => {
    await toggleDarkDB();
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-800 w-full p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white"><Link href={'/'}>PostPlace</Link></h1>
      <div className="flex items-center gap-4">
        <ProfileDropdown profileImage={profileImage} />
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            onCheckedChange={handleToggle}
            checked={isDark}
          />
          <Label htmlFor="dark-mode">
            {isDark ? <Moon /> : <Sun className="stroke-white" />}
          </Label>
        </div>
      </div>
    </div>
  );
}
