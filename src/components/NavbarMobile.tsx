'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import MenuBurgerIcon from './icons/MenuBurgerIcon'

interface Props {
  avatar: string
  name: string
}

function NavBarMobile({ name, avatar }: Props) {
  const pathname = usePathname()
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(true)

  const handleClickMenu = () => {
    setHiddenMenu(!hiddenMenu)
  }

  const handleClickOutsideMenu = () => {
    setHiddenMenu(true)
  }

  return (
    <nav className='flex md:hidden fixed bottom-0 bg-black w-full h-16 z-10' >
      <ul className='flex items-center justify-evenly w-full'>
        <Link
          href='/app/images'
          className={`${pathname === '/app/images' ? 'underline decoration-[3px] underline-offset-[6px]' : ''}`}
        >
          Images
        </Link>
        <Link
          href='/app/album'
          className={`${pathname === '/app/album' ? 'underline decoration-[3px] underline-offset-[6px]' : ''}`}
        >
          Album
        </Link>
        <Link
          href='/app/videos'
          className={`${pathname === '/app/videos' ? 'underline decoration-[3px] underline-offset-[6px]' : ''}`}
        >
          Video
        </Link>

        <button
          type='button'
          onClick={handleClickMenu}
        >
          <MenuBurgerIcon width={25} height={25} />
        </button>

        <div
          className={`${hiddenMenu ? 'invisible opacity-0' : 'visible opacity-100'} flex bg-[#00000068] absolute w-full h-screen bottom-0 left-0 justify-center items-end flex-col transition-all ease-out`}
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className='h-full w-full'
            onClick={handleClickOutsideMenu}
          />
          <div className={`${hiddenMenu ? 'translate-y-10' : 'translate-y-0'} w-full p-7 transition-all`}>
            <MobileMenu
              name={name}
              avatar={avatar}
              handleClickLink={handleClickMenu}
            />
          </div>
        </div>
      </ul>
    </nav>
  )
}

export default NavBarMobile
