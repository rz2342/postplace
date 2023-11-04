import Provider from '@/components/Provider'

export const metadata = {
  title: "PostPlace",
};

const RootLayout = ({ children }) => (
  <html lang="en" data-bs-theme="dark">
    <body>
      <Provider>

        <div>
          {/*<NavBar />*/}
          <main>{children}</main>
          {/*<Footer />*/}
        </div>
      </Provider>
    </body>
  </html>
);

export default RootLayout;