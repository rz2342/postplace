import Provider from "@/components/Provider";
import "@/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "PostPlace",
  description: "Sign in page",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/home');
  }
  return (
  <html lang="en" className="dark">
    <body className="relative">
      <Provider>{children}</Provider>
    </body>
  </html>
  )
};

export default RootLayout;
