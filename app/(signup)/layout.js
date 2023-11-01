import '../globals.css'

export const metadata = {
  title: 'Log in',
}

export default function RootLayout({ children }) {
  return (
    <html className='dark' lang="en">
      <body>{children}</body>
    </html>
  )
}
