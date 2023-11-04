import Provider from "@/components/Provider";
import "@/globals.css";

export const metadata = {
  title: "PostPlace",
  description: "Sign in page",
};

const RootLayout = ({ children }) => (
  <html lang="en" className="dark">
    <body className="relative">
      <Provider>{children}</Provider>
    </body>
  </html>
);

export default RootLayout;
