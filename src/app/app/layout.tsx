import Profile from '@/components/Profile'
import Link from 'next/link'
import { type ReactNode } from 'react'

function layout ({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen w-screen bg-secodary flex flex-col-reverse md:grid md:grid-cols-[16rem_1fr]'>

      <nav className='hidden md:flex flex-col justify-between text-xl'>
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
          <Profile />
        </div>
      </nav>

      <nav className='flex md:hidden basis-20' >
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

      <section className='bg-primary grow '>
        {children}
      </section>

    </main>
  )
}

export default layout
