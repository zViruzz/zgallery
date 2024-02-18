import FileContainer from '@/components/file-container'
import authUser from '@/util/auth-user'

async function page () {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  const imageUrl = []
  if (data === null) return

  const list = data[0].list_image === null ? [] : data[0].list_image.image

  for (const { name, id, height, width, fileType } of list) {
    const { data } = await supabase.storage
      .from('video')
      .createSignedUrl(`${user?.id}/${name}/${name}`, 3600)

    const { data: dataThumbnail } = await supabase.storage
      .from('video')
      .createSignedUrl(`${user?.id}/${name}/video_thumbnail.png`, 3600)

    if (data === null || dataThumbnail === null) continue
    const url = data.signedUrl
    const thumbnailUrl = dataThumbnail.signedUrl

    imageUrl.push({ id, name, url, height, width, fileType, thumbnailUrl })
  }
  return (
    <>
      <FileContainer list={imageUrl} />
    </>
  )
}

export default page
