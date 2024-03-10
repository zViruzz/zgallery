'use client'
import Link from 'next/link'
import MenuBurgerIcon from './Icons/menu-burger-icon'
import { usePathname } from 'next/navigation'

function NavbarMobile () {
  const pathname = usePathname()

  return (
    <nav className='flex md:hidden fixed bottom-0 bg-black w-full h-16 z-10' >
      <ul className='flex items-center justify-evenly w-full'>
        <Link
          href='/app/imagen'
          className={`${pathname === '/app/imagen' ? 'underline decoration-[3px] underline-offset-[6px]' : ''}`}
        >
          Imagen
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

        <button>
          <MenuBurgerIcon width={25} height={25} />
        </button>
      </ul>
    </nav>
  )
}

export default NavbarMobile
