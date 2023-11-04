import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
import "@/globals.css"

export const metadata = {
  title: "PostPlace",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className='bg-slate-300 dark:bg-slate-900'>
      <Provider>
        <div>
          <NavBar />
          <main>{children}</main>
          {/*<Footer />*/}
        </div>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
