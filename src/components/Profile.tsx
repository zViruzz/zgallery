'use client'
import Link from 'next/link'
import useAuth from '@/hook/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Profile () {
  const { supabase, signOut } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    signOut()
    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    supabase.auth.getUser()
  }, [])

  return (
    <>

      <Link href='/app/setting' >
        Setting
      </Link >

      <button onClick={handleClick}>
        signOut
      </button>
    </>
  )
}

export default Profile
