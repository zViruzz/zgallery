import MenuIcon from '@/components/Icons/MenuIcon'
import SearchIcon from '@/components/Icons/SearchIcon'
import AddButton from '@/components/add-button'
import authUser from '@/util/authUser'
import Image from 'next/image'

async function page () {
  const { supabase } = await authUser()

  const { data } = await supabase.storage
    .from('image')
    .list('9b589252-f3c3-4939-8d28-4b288d4e62da')

  const { data: { user } } = await supabase.auth.getUser()

  const objUrl = []

  if (data === null) return

  for (const { name } of data) {
    const { data } = await supabase.storage
      .from('image')
      .createSignedUrl(`${user?.id}/${name}`, 3600)

    if (data === null) continue
    const urlImage = data.signedUrl
    objUrl.push(urlImage)
  }

  return (
    <div className="w-full h-full px-14 py-6 grid grid-rows-[6rem_1fr]">

      <div className='flex items-center'>
        <div className='w-full flex justify-between'>

          <div>
            <h2 className='text-3xl'>Imagenes</h2>
          </div>
          <div className='flex gap-3 items-center'>
            <AddButton type="image" />
            <SearchIcon width={30} height={30} />
            <MenuIcon width={30} height={30} />
          </div>
        </div>

      </div>

      <div className='grid grid-cols-res grid-rows-res [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-scroll'>
        {objUrl?.map((item, index) => {
          return (
            <div key={index}>
              <Image className='object-cover w-svw h-full rounded-xl' src={item} width={200} height={200} alt='' />
            </div>
          )
        })}
        {objUrl?.map((item, index) => {
          return (
            <div key={index}>
              <Image className='object-cover w-svw h-full rounded-xl' src={item} width={200} height={200} alt='' />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default page
