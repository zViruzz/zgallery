import Link from 'next/link'

function NavbarMobile () {
  return (
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
  )
}

export default NavbarMobile
