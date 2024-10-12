import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/logo.svg'
import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import authUser from '@/util/auth-user'
import Profile from '@/components/ProfileUser'
import NavBarMobile from '@/components/NavbarMobile'
import GalleryIcon from '@/components/icons/GalleryIcon'
import AlbumIcon from '@/components/icons/AlbumIcon'
import VideoIcon from '@/components/icons/VideoIcon'
import HeartIcon from '@/components/icons/HeartIcon'
import ArrowUpIcon from '@/components/icons/ArrowUpIcon'

export const revalidate = 0

async function layout ({ children }: { children: ReactNode }) {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/auth/login')
  }

  const isPlan = user.user_metadata.user_plan

  if (isPlan === undefined) {
    await supabase.auth.updateUser({
      data: { user_plan: 'FREE' }
    })
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
                <Link href='/app/images'>
                  <GalleryIcon width={24} height={24} />
                  Images
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
            <div className='mb-5'>
              <Link href='/plans' className='text-base flex bg-secodary rounded-xl px-3 py-2 items-center'>
                <div>Upgrade your plan</div>
                <ArrowUpIcon width={30} height={30}/>
              </Link>
            </div>
            <div>
              <Profile user={user} />
            </div>
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
