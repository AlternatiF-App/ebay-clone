import './globals.css'
import { ToastContainer } from 'react-toastify'
import UserProvider from '@/app/context/user'
import CartProvider from '@/app/context/cart'
import 'react-toastify/dist/ReactToastify.css'

interface Metadata {
  title: string
  description: string
}

export const metadata: Metadata = {
  title: 'eBay Clone',
  description: 'eBay Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer/>
        <UserProvider>
          <CartProvider>
            { children }
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
