'use client'
import { useState, useEffect } from 'react'
import MenuBurgerIcon from './icons/MenuBurgerIcon'
import CloseIcon from './icons/CloseIcon'
import Link from 'next/link'

const MIN_WIDTH = '768px'
const HIDDEN = 'hidden'
const AUTO = 'auto'

function HomeMenuMobile () {
  const [showMenu, setShowMenu] = useState(false)

  const handleClick = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    const body = document.getElementById('page')
    if (body !== null) {
      body.style.overflow = showMenu ? HIDDEN : AUTO
    }
  }, [showMenu])

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia(`(min-width: ${MIN_WIDTH})`).matches) {
        setShowMenu(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className="justify-end flex lg:hidden">
        <button
          className={`m-3 fixed ${showMenu ? 'hidden' : 'block'}`}
          onClick={handleClick}>
          <MenuBurgerIcon width={35} height={35} />
        </button>
      </div>

      <nav className={`justify-center md:hidden ease-out transition-opacity duration-100 ${showMenu ? ' opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'}`}>
        <ul
          className='dark:bg-[#000000d5] dark:backdrop-blur-0 bg-[#efefefd5] backdrop-blur-sm duration-500 w-full h-full fixed rounded-xl flex flex-col gap-10 items-center [&>li]:text-xl hover:[&>li]:text-[var(--color-text-1)] hover:[&>li]:transition-colors [&>li>a]:px-6 [&>li>a]:py-3'
        >
          <li className="flex justify-end w-full pt-3 pr-3">
            <button onClick={handleClick}>
              <CloseIcon width={42} height={42} />
            </button>
          </li>
          <li><Link href='/auth/login' onClick={handleClick}>Log in</Link></li>
          <li><Link href="/plans" onClick={handleClick}>Plans</Link></li>
          <li><Link href='https://github.com/zViruzz/zgallery' onClick={handleClick}>Repository</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default HomeMenuMobile
