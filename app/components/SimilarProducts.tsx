'use client'

import { BiLoader } from "react-icons/bi"
import Product from "./Product"
// import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

interface ProductsProps {
  id: number
  title: string
  description: string
  url: string
  price: number
}

const queryClient = new QueryClient()

const SimilarProductQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SimilarProduct />
    </QueryClientProvider>
  )
}

const SimilarProduct = () => {

  // const [products, setProducts] = useState([])

  const getRandomProducts = async () => {
    try {
      const response = await fetch('/api/products/get-random')
      const results = await response.json()

      if (results) {
        // setProducts(results)
        return results
      }

      // setProducts([])
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const { data } = useQuery<any>({
    queryKey: ['stream-products'],
    queryFn: () => getRandomProducts()
  })

  // useEffect(() => { getRandomProducts() }, [])

  return (
    <div>
      <div className='border-b py-1 max-w-[1200px] mx-auto' />

      <div className='max-w-[1200px] mx-auto'>
        <div className='font-bold text-2xl py-2 mt-4'>Similar sponsored  items</div>
        
        {
          data?.length > 0
            ? <div className='grid grid-cols-5 gap-4'>
                {
                  data?.map((product: ProductsProps) => (
                    <Product key={product.id} product={product} />
                  ))
                }
              </div>
            : <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center gap-4 font-semibold'>
                  <BiLoader size={30} className='text-blue-400 animate-spin' />
                  Loading Products ...
                </div>
              </div>
        }
      </div>
    </div>
  )
}

export default SimilarProductQuery
