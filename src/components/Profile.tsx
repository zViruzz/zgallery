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
  }

  useEffect(() => {
    supabase.auth.getUser().then(res => { console.log(res) })
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
