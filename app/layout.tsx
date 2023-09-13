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
  title: 'Electronics, Cars, Fashion, Collectibles & More | eBay',
  description: 'Buy & sell electronics, cars, clothes, collectibles & more on eBay, the world`s online marketplace. Top brands, low prices & free shipping on many items.'
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
