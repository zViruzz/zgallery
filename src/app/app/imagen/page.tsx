import MenuIcon from '@/components/Icons/menu-icon'
import SearchIcon from '@/components/Icons/search-icon'
import AddButton from '@/components/add-button'
import ViewImage from '@/components/view-image'
import authUser from '@/util/authUser'

async function page () {
  const { supabase } = await authUser()

  const { data } = await supabase.storage
    .from('image')
    .list('9b589252-f3c3-4939-8d28-4b288d4e62da')

  const { data: { user } } = await supabase.auth.getUser()

  const imageUrl = []

  if (data === null) return

  for (const { name, id } of data) {
    const { data } = await supabase.storage
      .from('image')
      .createSignedUrl(`${user?.id}/${name}`, 3600)

    if (data === null) continue
    const url = data.signedUrl
    imageUrl.push({ id, name, url })
  }

  return (
    <div className="w-full h-full md:py-6 grid grid-rows-[6rem_1fr] md:grid-rows-[6rem_1fr]">

      <div className='flex items-center px-7 md:px-14'>
        <div className='w-full flex justify-between'>

          <div>
            <h2 className='md:text-3xl text-lg'>Imagenes</h2>
          </div>
          <div className='flex gap-3 items-center'>
            <AddButton type="image" />
            <SearchIcon className='w-[23px] h-[23px] md:w-[30px] md:h-[30px]'/>
            <MenuIcon className='w-[23px] h-[23px] md:w-[30px] md:h-[30px]' />
          </div>
        </div>

      </div>

      <div className='gallery-view grid grid-cols-res grid-rows-res [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8'>
        <ViewImage list={imageUrl}/>
      </div>

    </div>
  )
}

export default page
