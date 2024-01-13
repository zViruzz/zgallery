import Link from 'next/link'
import MenuBurgerIcon from './Icons/menu-burger-icon'

function NavbarMobile () {
  return (
    <nav className='flex md:hidden fixed bottom-0 bg-black w-full h-16' >
      <ul className='flex items-center justify-evenly w-full'>
        <Link href='/app/imagen'>
          Imagen
        </Link>
        <Link href='/app/album'>
          Album
        </Link>
        <Link href='/app/videos'>
          Videos
        </Link>

        <button>
          <MenuBurgerIcon width={25} height={25}/>
        </button>
      </ul>
    </nav>
  )
}

export default NavbarMobile
