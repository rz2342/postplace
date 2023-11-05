import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
import "@/globals.css"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "PostPlace",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
  <html lang="en">
    <body className='bg-slate-300 dark:bg-slate-900'>
      <Provider>
        <div>
          <NavBar profileImage={session.user.profilePicUrl} />
          <main>{children}</main>
          {/*<Footer />*/}
        </div>
      </Provider>
    </body>
  </html>
)};

export default RootLayout;
