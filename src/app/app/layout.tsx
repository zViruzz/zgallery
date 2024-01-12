import Profile from '@/components/Profile'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import authUser from '@/util/authUser'

export const revalidate = 0

async function layout ({ children }: { children: ReactNode }) {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    console.log('redireccion login')
    redirect('/auth/login')
  }

  return (
    <main className='min-h-screen w-full bg-primary flex flex-col md:grid md:grid-cols-[16rem_1fr]'>

      <nav className='hidden md:flex text-xl relative'>
        <div className='flex flex-col justify-between  h-full fixed'>
          <div>
            <h1 className='my-5 mx-auto text-center'>Logo</h1>
            <ul className='flex flex-col gap-3'>
              <Link href='/app/imagen'>
                Imagen
              </Link>
              <Link href='/app/album'>
                Album
              </Link>
              <Link href='/app/videos'>
                Videos
              </Link>
              <Link href='/app/favorites'>
                Favorites
              </Link>
            </ul>
          </div>

          <div>
            <Profile user={user} />
          </div>
        </div>
      </nav>

      <nav className='flex md:hidden fixed bottom-0 bg-black w-full h-20' >
        <ul className='flex items-center justify-center gap-5 w-full'>
          <Link href='/app/imagen'>
            Imagen
          </Link>
          <Link href='/app/album'>
            Album
          </Link>
          <Link href='/app/videos'>
            Videos
          </Link>
          <Link href='/app/favorites'>
            Favorites
          </Link>
        </ul>
      </nav>

      <section className='md:py-4 md:pr-4 min-w-full h-screen'>
        <div className='bg-secodary rounded-xl w-full h-full'>
          {children}
        </div>
      </section>

    </main>
  )
}

export default layout
