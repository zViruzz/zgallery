import FileContainer from '@/components/file-container'
import { type ExtendedFileType } from '@/type'
import authUser from '@/util/auth-user'
import { type SupabaseClient } from '@supabase/supabase-js'

interface Props {
  searchParams: {
    name: string
  }
}

const getSignedUrls = async (supabase: SupabaseClient, pathList: string[], bucket: string) => {
  const { data: resultUrls } = await supabase.storage
    .from(bucket)
    .createSignedUrls(pathList, 10000)
  return resultUrls ?? []
}

async function page ({ searchParams }: Props) {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()
  const { name } = searchParams

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  const imageUrl: ExtendedFileType[] = []
  if (data === null) return
  let list: ExtendedFileType[] = data[0].list_image === null ? [] : data[0].list_image.image

  if (name !== undefined) {
    list = list.filter(img => img.name.includes(name))
  }

  const filterFavorite = (list: ExtendedFileType[]) => {
    return list.filter(item => item.favorite)
  }
  const favoritesList = filterFavorite(list)

  const imagePathList = favoritesList
    .filter(img => img.fileType === 'image')
    .map(img => `${user?.id}/${img.fileName}`)

  const videoPathList = favoritesList
    .filter(video => video.fileType === 'video')
    .map(video => `${user?.id}/${video.fileName}/${video.fileName}`)

  const thumbnailPathList = favoritesList
    .filter(video => video.fileType === 'video')
    .map(video => `${user?.id}/${video.fileName}/video_thumbnail.png`)

  const listOfImageUrls = await getSignedUrls(supabase, imagePathList, 'image')
  const listOfIVideoUrls = await getSignedUrls(supabase, videoPathList, 'video')
  const listOfThumbnailUrls = await getSignedUrls(supabase, thumbnailPathList, 'video')

  let indexImage = 0
  let indexVideo = 0
  for (const file of favoritesList) {
    let url
    let thumbnailUrl
    const { fileType } = file

    if (fileType === 'image') {
      url = listOfImageUrls[indexImage].signedUrl
      imageUrl.push({ ...file, url })
      indexImage++
    } else if (fileType === 'video') {
      url = listOfIVideoUrls[indexVideo].signedUrl
      thumbnailUrl = listOfThumbnailUrls[indexVideo].signedUrl
      imageUrl.push({ ...file, url, thumbnailUrl })
      indexVideo++
    }
  }

  return (
    <FileContainer list={imageUrl} />
  )
}

export default page
