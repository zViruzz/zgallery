import React from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function layout ({ children }: { children: React.ReactNode }) {
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
  const { data } = await supabase.auth.getUser()
  if (data.user !== null) {
    redirect('/app')
  }

  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      {children}
    </main>
  )
}

export default layout
