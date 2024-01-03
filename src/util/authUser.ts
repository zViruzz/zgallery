import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

async function authUser () {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  return { supabase }
}

export default authUser
