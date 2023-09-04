'use client'

import { useRouter } from 'next/navigation'
import TextInput from '../components/TextInput'
import MainLayout from '../layouts/MainLayout'
import { useUser } from '@/app/context/user'
import { useEffect, useState } from 'react'
import UseIsLoading from '../hooks/useIsLoading'
import UseCreateAddress from '../hooks/useCreateAddress'
import UseUserAddress from '../hooks/useUserAddress'
import { toast } from 'react-toastify'
import ClientOnly from '../components/ClientOnly'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Address = () => {
  const router = useRouter()
  const { user } = useUser()

  const [addressId, setAddressId] = useState(null)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false)
  const [error, setError] = useState<any>({})

  const showError = (type: string) => {
    if (Object.entries(error).length > 0 && error?.type === type) {
      return error.message
    }
    return ''
  }

  const getAddress = async () => {
    if (user?.id === null || user?.id === undefined) {
      UseIsLoading(false)
      return 
    }

    const response = await UseUserAddress()
    if (response) {
      setTheCurrentAddress(response)
      UseIsLoading(false)
      return
    }

    UseIsLoading(false)
  }

  useEffect(() => {
    UseIsLoading(true)
    getAddress()
  }, [user])

  const setTheCurrentAddress = (result: any) => {
    setAddressId(result.id)
    setName(result.name)
    setAddress(result.address)
    setZipcode(result.zipcode)
    setCity(result.city)
    setCountry(result.country)
  }

  const validate = () => {
    setError(null)
    setError({})
    let isError = false

    if (!name) {
      setError({ type: 'name', message: 'A name is required'})
      isError = true
    } else if (!address) {
      setError({ type: 'address', message: 'An address is required'})
      isError = true
    } else if (!zipcode) {
      setError({ type: 'zipcode', message: 'A zipcode is required'})
      isError = true
    } else if (!city) {
      setError({ type: 'city', message: 'A city is required'})
      isError = true
    } else if (!country) {
      setError({ type: 'country', message: 'A country is required'})
      isError = true
    }
    return isError
  }

  const submit = async (event: any) => {
    event.preventDefault();
    let isError = validate()

    if (isError) { 
      toast.error(error.message, { autoClose: 3000 })
      return 
    }

    try {
      setIsUpdatingAddress(true)

      const response = await UseCreateAddress({
        addressId, 
        name, 
        address, 
        zipcode, 
        city, 
        country 
      })

      setTheCurrentAddress(response)
      setIsUpdatingAddress(false)

      toast.success('Address updated!', { autoClose: 3000 })

      router.push('/checkout')
    } catch (error) {
      setIsUpdatingAddress(false)
      console.log(error)
      alert(error)
    }
  }

  return (
    <MainLayout>
      <div id='address-page' className='mt-4 max-w-[600px] mx-auto px-2'>
        <div className='mx-auto bg-white rounded-lg p-3'>
          <div className='text-xl font-bold mb-2'>Address Details</div>

          <form onSubmit={submit }>
            <div className='mb-4'>
              <ClientOnly>
                <TextInput
                  string={name}
                  placeholder='Name'
                  error={showError('name')}
                  onUpdate={setName}
                />
              </ClientOnly>
            </div>

            <div className='mb-4'>
              <ClientOnly>
                <TextInput 
                  string={address}
                  placeholder='Address'
                  onUpdate={setAddress}
                  error={showError('address')}
                />
              </ClientOnly>
            </div>

            <div className='mb-4 mt-2'>
              <ClientOnly>
                <TextInput 
                  string={zipcode}
                  placeholder='Zip Code'
                  onUpdate={setZipcode}
                  error={showError('zipcode')}
                />
              </ClientOnly>
            </div>

            <div className='mb-4 mt-2'>
              <ClientOnly>
                <TextInput
                  string={city}
                  placeholder='City'
                  onUpdate={setCity}
                  error={showError('city')}
                />
              </ClientOnly>
            </div>

            <div className='mt-2'>
              <ClientOnly>
                <TextInput
                  string={country}
                  placeholder='Country'
                  onUpdate={setCountry}
                  error={showError('country')}
                />
              </ClientOnly>
            </div>

            <button
              type='submit'
              disabled={isUpdatingAddress }
              className={`mt-6 w-full text-white text-lg font-semibold p-3 rounded ${isUpdatingAddress ? 'bg-blue-800' : 'bg-blue-600'}`}>
                {
                  !isUpdatingAddress
                    ? <div>Update Address</div>
                    : <div className="flex items-center justify-center gap-2">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        Please wait...
                      </div>
                }
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default Address
