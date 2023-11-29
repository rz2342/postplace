import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
import "@/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "@/models/User";
import connectToDB from "@/db.mjs";

export const metadata = {
  title: "PostPlace",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  await connectToDB();
  const user = await User.findById(session.user.userId);
  const dark = user.dark;
  return (
    <html lang="en" className={dark ? "dark" : ""}>
      <body className="bg-slate-300 dark:bg-slate-900">
        <Provider>
          <div>
            <NavBar user={JSON.stringify(user)} />
            <main>{children}</main>
            {/*<Footer />*/}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
