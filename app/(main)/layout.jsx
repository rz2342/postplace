import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
import "@/globals.css"

export const metadata = {
  title: "PostPlace",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
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
