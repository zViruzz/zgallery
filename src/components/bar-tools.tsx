'use client'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from './search-bar'
import AddButton from './add-button'
import MenuIcon from './Icons/menu-icon'
import MenuTools from './menu-tools'

interface Props {
  title: string
  type?: 'image' | 'video'
}

function BarTools ({ type, title }: Props) {
  const [isHiddenSearch, setHiddenSearch] = useState(true)
  const [isHiddenMenu, setHiddenMenu] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
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
    <div className='w-full flex justify-between items-center relative'>

      <div className={`${isHiddenSearch ? 'block' : 'hidden md:block'} `}>
        <h2 className='md:text-3xl text-lg'>
          {title}
        </h2>
      </div>
      <div className='flex gap-3 items-center w-full md:w-auto justify-end'>
        <SearchBar
          isHiddenSearch={isHiddenSearch}
          setHiddenSearch={setHiddenSearch}
        />
        {
          type === undefined
            ? null
            : <button className={`${isHiddenSearch ? 'block' : 'hidden md:block'} `}>
              <AddButton type={type} />
            </button>
        }
        <div className={`${isHiddenSearch ? 'grid' : 'hidden md:grid'}  hover:bg-[#212121] rounded-full h-10 w-10 place-content-center relative`} >
          <button onClick={handleClickMenu}>
            <MenuIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
          </button>
          <MenuTools
            isHiddenMenu={isHiddenMenu}
            setHiddenMenu={setHiddenMenu}
          />
        </div>
      </div>
    </div>
  )
}

export default BarTools
