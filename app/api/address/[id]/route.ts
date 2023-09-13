import prisma from '@/app/libs/Prisma'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const GET = async () => {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw Error()

    const res = await prisma.addresses.findFirst({
      where: { user_id: user?.id }
    })

    await prisma.$disconnect()
    return NextResponse.json(res)
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}