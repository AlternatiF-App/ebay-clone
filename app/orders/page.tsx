'use client'

import Link from 'next/link'
import MainLayout from '../layouts/MainLayout'
import { CiDeliveryTruck } from 'react-icons/ci'
import { useUser } from '../context/user'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import UseIsLoading from '../hooks/useIsLoading'
import moment from 'moment'

const Orders = () => {

  const { user } = useUser()
  const [orders, setOrders] = useState<any>([])

  const getOrders = async () => {
    try {
      if (!user && !user?.id) return
      const response = await fetch('/api/orders')
      const results = await response.json()
      setOrders(results)
      UseIsLoading(false)
    } catch (error) {
      toast.error('Something went wrong?', { autoClose: 3000 })
      UseIsLoading(false)
    }
  }

  useEffect(() => {
    UseIsLoading(true)
    getOrders()
  }, [user])

  return (
    <MainLayout>
      <div id='orders-page' className='mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]'>
        <div className='bg-white w-full p-6 min-h-[150px]'>
          <div className='flex items-center text-xl'>
            <CiDeliveryTruck className='text-green-500' size={35} />
            <span className='pl-4'>Orders</span>
          </div>

          {
            orders.length < 1
              ? <div className='flex items-center justify-center'>
                  You have no order history
                </div>
              : null
          }

          {
            orders.map((order: any) => (
              <div key={order.id} className='text-sm pl-[50px]'>
                <div className='border-p py-1'>
                  <div className='pt-2'>
                    <span className='font-bold mr-2'>Stripe ID:</span>
                    { order?.strip_id }
                  </div>
                  <div className='pt-2'>
                    <span className='font-bold mr-2'>Delivery Address:</span>
                    { order?.name }, { order?.address }, { order?.zipcode }, { order?.city }, { order?.country }
                  </div>
                  <div className='pt-2'>
                    <span className='font-bold mr-2'>Total:</span>
                    £{ order?.total / 100 }
                  </div>
                  <div className='pt-2'>
                    <span className='font-bold mr-2'>Order Created:</span>
                    { moment(order?.created_at).calendar() }
                  </div>
                  <div className='pt-2'>
                    <span className='font-bold mr-2'>Delivery Time:</span>
                    { moment(order?.created_at).add(3 ,'days').calendar() }
                  </div>
                  <div className='flex items-center gap-4'>
                    {
                      order.orderItem.map((item: any) => (
                        <div key={item.product_id} className='flex items-center'>
                          <Link href={`/product/${item.product_id}`} className='py-1 hover:underline text-blue-500 font-bold'>
                            <img className='rounded' width='120' src={item.product.url+'/120'} />
                            { item.product.title }
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default Orders
