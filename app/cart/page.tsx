'use client'

import { useRouter } from "next/navigation"
import CartItem from "../components/CartItem"
import SimilarProduct from "../components/SimilarProducts"
import MainLayout from "../layouts/MainLayout"
import { useCart } from "../context/cart"
import { useEffect } from "react"
import UseIsLoading from "../hooks/useIsLoading"
import ClientOnly from "../components/ClientOnly"

const Cart = () => {

  const router = useRouter()
  const cart = useCart()

  useEffect(() => {
    UseIsLoading(true)
    cart.getCart()
    cart.cartTotal()
    UseIsLoading(false)
  }, [cart])

  const goToCheckout = () => {
    if (!cart.cartTotal()) {
      alert('You don`t have any cart items in the cart.')
      return
    }
    router.push('/checkout ')
  }

  return (
    <MainLayout>
      <div>
        <div className='max-w-[1200px] mx-auto mb-8 min-h-[300px]'>
          <div className='text-2xl font-bold my-4'>Shopping cart</div>
          <div className='relative flex items-baseline justify-between gap-2'>
            <ClientOnly>
              <div className='w-[65%]'>
                {
                  cart.getCart().map((product :any) => (
                    <CartItem key={product.id} product={product} />
                  ))
                }
              </div>
            </ClientOnly>

            <div id='go-to-checkout' className='md:w-[33%] absolute top-0 right-0 m-2'>
              <ClientOnly>
                <div className='ng-white p-4 border'>
                  <button
                    onClick={() => goToCheckout()}
                    className='flex items-center justify-center bg-blue-600 w-full text-white font-semibold p-3 rounded-full mt-4 '>
                    Go to checkout
                  </button>

                  <div className='flex items-center justify-between mt-4 text-sm mb-1'>
                    <div>Items ({ cart.getCart().length })</div>
                    <div>£{ (cart.cartTotal() / 100).toFixed(2) }</div>
                  </div>

                  <div className='flex items-center justify-between mb-4 text-sm'>
                    <div>Shipping</div>
                    <div>Free</div>
                  </div>

                  <div className='border-b border-gray-300' />

                  <div className='flex items-center justify-between mt-4 mb-1 text-lg font-semibold '>
                    <div>Subtotal</div>
                    <div>£{ (cart.cartTotal() / 100).toFixed(2) }</div>
                  </div>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>

        <SimilarProduct/>
      </div>
    </MainLayout>
  )
}

export default Cart
