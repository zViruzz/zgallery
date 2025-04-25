'use client'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useEffect } from 'react'

function page() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? (() => { throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined') })(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? (() => { throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined') })()
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session === null) {
        console.log('Session is null')
      }
    })

    return () => {
      authListener.subscription
    }
  }, [])

  return (
    <div className='bg-black flex flex-col p-10 gap-5  rounded-2xl'>
      <div className='text-xl'>
        <p>
          Provider
        </p>
      </div>
      <div className='grid place-content-center'>
        <Link
          className='bg-tertiary p-3 rounded-lg block'
          href="/app"
        >
          Open the app
        </Link>
      </div>
    </div>
  )
}

export default page
