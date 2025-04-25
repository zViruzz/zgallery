'use client'
import { NotificationProvider } from '@/context/notification'
import React, { useEffect, useRef, useState } from 'react'
import AddButton from './AddButton'
import MenuTools from './MenuTools'
import SearchBar from './SearchBar'
import MenuIcon from './icons/MenuIcon'

interface Props {
  title: string
  type?: 'image' | 'video'
}

function BarTools({ type, title }: Props) {
  const [isHiddenSearch, setHiddenSearch] = useState(true)
  const [isHiddenMenu, setHiddenMenu] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current !== null &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setHiddenMenu(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickMenu = () => {
    setHiddenMenu(!isHiddenMenu)
  }

  return (
    <NotificationProvider>
      <div className='w-full flex justify-between items-center'>
        <div className={`${isHiddenSearch ? 'block' : 'hidden md:block'} `}>
          <h2 className='md:text-3xl text-lg'>
            {title}
          </h2>
        </div>
        <div className='flex gap-3 items-center w-full md:w-auto justify-end hover:[&>div]:bg-neutral-800 hover:[&>div]:rounded-full [&>div]:transition-all [&>div]:ease-out [&>div]:duration-200'>
          <SearchBar
            isHiddenSearch={isHiddenSearch}
            setHiddenSearch={setHiddenSearch}
          />
          {
            type === undefined
              ? null
              : <div
                // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                tabIndex={0}
                className={`${isHiddenSearch ? 'block' : 'hidden md:block'} hover:bg-neutral-800 rounded-full`}
              >
                <AddButton type={type} />
              </div>
          }
          <div className={`${isHiddenSearch ? 'grid' : 'hidden md:grid'} rounded-full h-10 w-10 place-content-center relative`}>
            <button
              type='button'
              className='rounded-full grid h-10 w-10 place-content-center '
              onClick={handleClickMenu}>
              <MenuIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
            </button>
            <MenuTools
              isHiddenMenu={isHiddenMenu}
              setHiddenMenu={setHiddenMenu}
            />
          </div>
        </div>
      </div>

    </NotificationProvider>
  )
}

export default BarTools
