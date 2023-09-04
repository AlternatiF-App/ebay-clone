'use client'

import Link from "next/link"

interface TextInputProps {
  string: string
  placeholder: string
  error?: string
  onUpdate: Function
}

const TextInput = (props: TextInputProps) => {
  const { string, placeholder, error, onUpdate  } = props

  return (
    <>
      <input
        placeholder={placeholder}
        value={string || ''}
        onChange={(e) => onUpdate(e.target.value)}
        className='w-full bg-white text-gray-800 border text-sm border-[#272727] p-3 placeholder-gray-500 focus:outline-none'
        type='text'
        autoComplete='off'
      />

      <div className='text-red-500 text-[14px] font-semibold'>
        { error ? (error) : null }
      </div>
    </>
  )
}

export default TextInput
