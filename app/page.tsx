"use client"

import MainLayout from '@/app/layouts/MainLayout'
import CarouselComp from '@/app/components/CarouselComp'
import Product from '@/app/components/Product'
import { useEffect, useState } from 'react'
import UseIsLoading from './hooks/useIsLoading'

interface ProductsProps {
  id: number
  title: string
  description: string
  url: string
  price: number
}

const Home = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    UseIsLoading(true)

    const resposne = await fetch('/api/products')
    const prod = await resposne.json()

    setProducts([])
    setProducts(prod)
    UseIsLoading(false)
  }

  useEffect(() => { getProducts() }, [])

  return (
    <MainLayout>
      <div>
        <CarouselComp/>

        <div className='max-w-[1200px] mx-auto'>
          <div className='text-2xl font-bold mt-4 mb-6 px-4'>Products</div>

          <div className='grid grid-cols-5 gap-4'>
            {
              products.map((product: ProductsProps) => (
                <Product key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
