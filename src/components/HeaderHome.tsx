import Link from 'next/link'

function Header () {
  return (
    <header className='flex justify-end items-center w-full h-24 absolute'>
      <div></div>
      <nav className='text-xl mr-28'>
        <ul className='flex [&>li>a]:p-3 gap-8'>
          <li><a href='#'>Repository</a></li>
          <li><Link href='/plans'>Plans</Link></li>
          <li><a href='/auth/login'>Log in</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
