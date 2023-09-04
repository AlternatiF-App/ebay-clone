"use client"

import MainLayout from '@/app/layouts/MainLayout'
import CarouselComp from '@/app/components/CarouselComp'
import Product from '@/app/components/Product'
import { SyntheticEvent, useEffect, useState } from 'react'
import UseIsLoading from './hooks/useIsLoading'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { BsChevronDown  } from 'react-icons/bs'

interface ProductsProps {
  id: number
  title: string
  description: string
  url: string
  price: number
  category: string
}

const queryClient = new QueryClient()

const HomeQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

const Home = () => {
  // const [products, setProducts] = useState([])
  const [btnFilter, setBtnFilter] = useState(false)
  const [filter, setFilter] = useState('')

  const getProducts = async () => {
    UseIsLoading(true)

    const resposne = await fetch('/api/products')
    const prod = await resposne.json()

    // setProducts([])
    // setProducts(prod)
    UseIsLoading(false)
    return prod
  }

  const { data } = useQuery<any>({
    queryKey: ['stream-products'],
    queryFn: () => getProducts()
  })

  const handleFilter = (filter: SyntheticEvent) => {
    const target = filter.target as typeof filter.target & { attributes: { value: { nodeValue: string } } }
    setFilter(target.attributes.value.nodeValue)
  }

  // useEffect(() => { getProducts() }, [])

  return (
    <MainLayout>
      <div>
        <CarouselComp/>

        <div className='max-w-[1200px] mx-auto'>
          <div className='flex justify-between items-center'>
            <div className='text-2xl font-bold mt-4 mb-6 px-4'>Products</div>
            <div className='relative'>
              <button onMouseEnter={() => setBtnFilter(true)} onMouseLeave={() => setBtnFilter(false)}
                className="hidden lg:flex bg-white justify-between items-center space-x-4 px-4 py-2 text-sm text-dim-gray rounded-md shadow-card capitalize w-48">
                { filter === '' ? 'Filter' : filter }
                <BsChevronDown size={22} />
              </button>
              <ul onMouseEnter={() => setBtnFilter(true)} onMouseLeave={() => setBtnFilter(false)}
                className={`${btnFilter ? 'visible opacity-100' : 'invisible opacity-0'} bg-white transition-all duration-200 ease-in-out absolute w-full z-50 rounded-md shadow-card my-1 text-sm`}>
                <li className="hover:bg-blue-200 cursor-pointer px-4 py-2 flex justify-between" value=""
                  onClick={(e: any) => { handleFilter(e) }}>
                  All Category
                </li>
                <li className="hover:bg-blue-200 cursor-pointer px-4 py-2 flex justify-between" value="category"
                  onClick={(e: any) => { handleFilter(e) }}>
                  Category
                </li>
                <li className="hover:bg-blue-200 cursor-pointer px-4 py-2 flex justify-between" value="atk"
                  onClick={(e: any) => { handleFilter(e) }}>
                  ATK
                </li>
                <li className="hover:bg-blue-200 cursor-pointer px-4 py-2 flex justify-between" value="fashion"
                  onClick={(e: any) => { handleFilter(e) }}>
                  Fashion
                </li>
              </ul>
            </div>
          </div>

          <div className='grid grid-cols-5 gap-4'>
            {
              filter === ''
              ? data?.map((product: ProductsProps) => {
                  return <Product key={product.id} product={product} />
                })
              : data?.filter((value: ProductsProps) => value.category.toLowerCase() === filter)
                .map((product: ProductsProps) => {
                  return <Product key={product.id} product={product} />
                })
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default HomeQuery
