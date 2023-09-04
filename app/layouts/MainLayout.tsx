'use client'

import TopMenu from '@/app/layouts/includes/TopMenu'
import MainHeader from '@/app/layouts/includes/MainHeader'
import SubMenu from '@/app/layouts/includes/SubMenu'
import Footer from '@/app/layouts/includes/Footer'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

interface MainLayoutProps {
  children: JSX.Element
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.addEventListener('storage', function () {
      let res = localStorage.getItem('isLoading')
      res === 'false' ? setIsLoading(false) : setIsLoading(true)
    })
  })

  return (
    <div id='main-layout' className='min-w-[1050px] max-w-[1300px] mx-auto'>
      <div>
        {
          isLoading ? <Loading/> : <div/>
        }
        <TopMenu/>
        <MainHeader/>
        <SubMenu/>

        { children }

        <Footer/>
      </div>
    </div>
  )
}

export default MainLayout
