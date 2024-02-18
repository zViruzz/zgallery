import MenuIcon from '@/components/Icons/menu-icon'
import SearchIcon from '@/components/Icons/search-icon'
import React, { type ReactNode } from 'react'

function layout ({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full md:py-6 grid grid-rows-[6rem_1fr] md:grid-rows-[6rem_1fr]">

      <div className='flex items-center px-7 md:px-14'>

        <div className='w-full flex justify-between'>

          <div>
            <h2 className='md:text-3xl text-lg'>Imagenes</h2>
          </div>
          <div className='flex gap-2 items-center'>

            <button className='hover:bg-[#212121] rounded-full h-10 w-10 grid place-content-center'>
              <SearchIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
            </button>
            <button className='hover:bg-[#212121] rounded-full h-10 w-10 grid place-content-center'>
              <MenuIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
            </button>
          </div>
        </div>

      </div>

      {children}

    </div>
  )
}

export default layout
