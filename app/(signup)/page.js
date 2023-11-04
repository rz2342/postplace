"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CardLogin from "@/components/CardLogin";
import CardSignup from "@/components/CardSignup";

const SignIn = () => {
  const [signupCard, setSignupCard] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggle = () => {
    const html = document.querySelector("html");
    html.classList.toggle("dark");
  };

  useEffect(() => {
    if (session && session.user) {
      console.log("detected ur already logged in, redirecting to home page");
      return router.push("/home");
    }
  }, [router, session]);

  return (
    <div>
      {signupCard ? (
        <CardSignup switchToSignup={setSignupCard} />
      ) : (
        <CardLogin switchToSignup={setSignupCard} />
      )}
      <button className="absolute top-0 right-0" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

export default SignIn;
