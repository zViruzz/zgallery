import MenuIcon from '@/components/Icons/menu-icon'
import SearchIcon from '@/components/Icons/search-icon'
import AddButton from '@/components/add-button'
import ViewImage from '@/components/view-image'
import authUser from '@/util/authUser'
import React from 'react'

async function page () {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  const imageUrl = []
  const list = data[0].list_image === null ? [] : data[0].list_image.image

  for (const { name, id, height, width } of list) {
    const { data } = await supabase.storage
      .from('video')
      .createSignedUrl(`${user?.id}/${name}`, 3600)

    if (data === null) continue
    const url = data.signedUrl

    imageUrl.push({ id, name, url, height, width })
  }
  return (
    <div className="w-full h-full md:py-6 grid grid-rows-[6rem_1fr] md:grid-rows-[6rem_1fr]">

      <div className='flex items-center px-7 md:px-14'>

        <div className='w-full flex justify-between'>

          <div>
            <h2 className='md:text-3xl text-lg'>Videos</h2>
          </div>
          <div className='flex gap-2 items-center'>
            <AddButton type="video" />
            <button className='hover:bg-[#212121] rounded-full h-10 w-10 grid place-content-center'>
              <SearchIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
            </button>
            <button className='hover:bg-[#212121] rounded-full h-10 w-10 grid place-content-center'>
              <MenuIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
            </button>
          </div>
        </div>

      </div>

      <ViewImage list={imageUrl} />

    </div>
  )
}

export default page
