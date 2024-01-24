import MenuIcon from '@/components/Icons/menu-icon'
import SearchIcon from '@/components/Icons/search-icon'
import AddButton from '@/components/add-button'
import ImageContainer from '@/components/image-container'
import { Suspense } from 'react'

async function page () {
  return (
    <div className="w-full h-full md:py-6 grid grid-rows-[6rem_1fr] md:grid-rows-[6rem_1fr]">

      <div className='flex items-center px-7 md:px-14'>
        <div className='w-full flex justify-between'>

          <div>
            <h2 className='md:text-3xl text-lg'>Imagenes</h2>
          </div>
          <div className='flex gap-3 items-center'>
            <AddButton type="image" />
            <SearchIcon className='w-[23px] h-[23px] md:w-[30px] md:h-[30px]' />
            <MenuIcon className='w-[23px] h-[23px] md:w-[30px] md:h-[30px]' />
          </div>
        </div>

      </div>

      <Suspense fallback={
        <div className='grid place-content-center'>
          <div className='loader' />
        </div>
      }>
        <ImageContainer />
      </Suspense>

    </div>
  )
}

export default page
