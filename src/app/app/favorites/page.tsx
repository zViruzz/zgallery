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

  const filterFavorite = (list: ExtendedFileType[]) => {
    return list.filter(item => item.favorite)
  }
  const newList = filterFavorite(list)

  for (const { name, id, height, width, fileType, favorite } of newList) {
    let url
    let thumbnailUrl

    if (fileType === 'image') {
      const { data } = await supabase.storage
        .from('image')
        .createSignedUrl(`${user?.id}/${name}`, 3600)
      if (data === null) continue
      url = data.signedUrl
    } else if (fileType === 'video') {
      const { data } = await supabase.storage
        .from('video')
        .createSignedUrl(`${user?.id}/${name}/${name}`, 3600)

      const { data: dataThumbnail } = await supabase.storage
        .from('video')
        .createSignedUrl(`${user?.id}/${name}/video_thumbnail.png`, 3600)

      if (data === null || dataThumbnail === null) continue
      url = data.signedUrl
      thumbnailUrl = dataThumbnail.signedUrl
    }
    if (url === undefined) { console.log('url undefined'); return }
    imageUrl.push({ id, name, url, height, width, fileType, favorite, thumbnailUrl })
  }

  return (
      <FileContainer list={imageUrl} />
  )
}

export default page
