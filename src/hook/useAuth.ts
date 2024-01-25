/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'
import { type User, type UserResponse } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

interface signinUserType {
  email: string
  password: string
}

function useAuth () {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const getUser = async (): Promise<UserResponse> => {
    return await supabase.auth.getUser()
  }

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/auth/verification/provider'
        }
      })
      if (error != null) console.error('A ocurido un error al autenticar', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    try {
      const id = user?.id
      if (id === undefined) return
      const { data, error } = await supabase.auth.admin.deleteUser(id)
      if (error != null) console.error('A ocurido un error al eliminar user', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  const registerUser = async ({ email, password }: signinUserType) => {
    try {
      console.log({ email, password })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https//example.com/welcome'
        }
      })
      if (error != null) console.error('A ocurido un error al autenticar', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = async ({ email, password }: signinUserType) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error != null) console.error('A ocurido un error al autenticar', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  async function signOut () {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
      .then(res => {
        setUser(res.data.user)
      })
  }, [])

  return {
    registerUser,
    loginUser,
    supabase,
    signOut,
    signInWithGoogle,
    getUser,
    deleteUser,
    user
  }
}

export default useAuth
