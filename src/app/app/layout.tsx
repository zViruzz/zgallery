import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/logo.svg'
import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import authUser from '@/util/auth-user'
import Profile from '@/components/ProfileUser'
import NavBarMobile from '@/components/NavbarMobile'
import GalleryIcon from '@/components/Icons/GalleryIcon'
import AlbumIcon from '@/components/Icons/AlbumIcon'
import VideoIcon from '@/components/Icons/VideoIcon'
import HeartIcon from '@/components/Icons/HeartIcon'

export const revalidate = 0

async function layout ({ children }: { children: ReactNode }) {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/auth/login')
  }

  return (
    <main className='min-h-screen w-full bg-primary flex flex-col md:grid md:grid-cols-[16rem_1fr]'>

      <nav className='hidden md:flex text-[1.2rem] relative p-4 pt-2'>
        <div className='flex flex-col justify-between w-full h-full sticky'>
          <div>
            <div className='flex justify-center py-5'>
              <Image
                src={logo}
                width={135}
                alt="Logo"
              />
            </div>
            <ul className='flex flex-col gap-4 mt-5
            [&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-3 [&>li>a]:transition-all
            [&>li>a]:duration-75 [&>li>a]:ease-out
            [&>li]:underline-offset-[6px] [&>li>a]:bg-secodary [&>li>a]:p-3 [&>li>a]:rounded-xl hover:[&>li>a]:bg-transparent hover:[&>li>a]:scale-[1.07]'>
              <li>
                <Link href='/app/imagen'>
                  <GalleryIcon width={24} height={24} />
                  Imagen
                </Link>
              </li>
              <li >
                <Link href='/app/album'>
                  <AlbumIcon width={27} height={27} />
                  Album
                </Link>
              </li>
              <li>
                <Link href='/app/videos'>
                  <VideoIcon width={25} height={25} />
                  Video
                </Link>
              </li>
              <li >
                <Link href='/app/favorites'>
                  <HeartIcon width={27} height={27} />
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Profile user={user} />
          </div>
        </div>
      </nav>

      <NavBarMobile
        name={user.user_metadata.name}
        avatar={user.user_metadata.avatar_url}
      />

      <section className='md:py-4 md:pr-4 min-w-full h-screen'>
        <div className='md:bg-secodary rounded-xl w-full h-full'>
          {children}
        </div>
      </section>

    </main >
  )
}

export default layout
