'use client'
import Link from 'next/link'
import useAuth from '@/hook/useAuth'
import { useEffect } from 'react'

function Profile () {
  const { supabase, signOut } = useAuth()

  useEffect(() => {
    supabase.auth.getUser().then(res => { console.log(res) })
  }, [])

  return (
    <>

      <Link href='/app/setting' >
        Setting
      </Link >

      <button onClick={() => {
        signOut()
      }}>
        signOut
      </button>
    </>
  )
}

export default Profile
