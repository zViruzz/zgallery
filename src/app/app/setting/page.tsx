'use client'
import useAuth from '@/hook/useAuth'
import { type User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page () {
  const [user, setUser] = useState<User>()
  const { supabase, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user === null) {
        console.log('User is null')
        return
      }
      setUser(user)
    })
  }, [])

  const handleClick = () => {
    signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div>
      {user?.email}
      <button onClick={handleClick}>
        Sign Out
      </button>
    </div>
  )
}

export default page
