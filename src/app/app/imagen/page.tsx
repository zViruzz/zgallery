import FileContainer from '@/components/file-container'
import { type ExtendedFileType } from '@/type'
import authUser from '@/util/auth-user'

async function page () {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  const imageUrl: ExtendedFileType[] = []
  if (data === null) return
  const list: ExtendedFileType[] = data[0].list_image === null ? [] : data[0].list_image.image

  for (const { fileName, name, id, height, width, fileType, favorite } of list) {
    const { data } = await supabase.storage
      .from('image')
      .createSignedUrl(`${user?.id}/${fileName}`, 3600)

    if (data === null) continue
    const url = data.signedUrl

    imageUrl.push({ id, fileName, name, url, height, width, favorite, fileType })
  }

  return (
    <>
      <FileContainer list={imageUrl} />
    </>
  )
}

export default page
