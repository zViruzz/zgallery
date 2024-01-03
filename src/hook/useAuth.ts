/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'

interface registerUserType {
  email: string
  password: string
}

function useAuth () {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const registerUser = async ({ email, password }: registerUserType) => {
    console.log({ email, password })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https//example.com/welcome'
      }
    })
    return { data, error }
  }

  const loginUser = async ({ email, password }: registerUserType) => {
    console.log({ email, password })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  async function signOut () {
    const { error } = await supabase.auth.signOut()
  }

  return { registerUser, loginUser, supabase, signOut }
}

export default useAuth
