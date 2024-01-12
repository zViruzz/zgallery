/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'

interface signinUserType {
  email: string
  password: string
}

function useAuth () {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const getUser = async () => {
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

  return {
    registerUser,
    loginUser,
    supabase,
    signOut,
    signInWithGoogle,
    getUser
  }
}

export default useAuth
