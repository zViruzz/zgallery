import FileContainer from '@/components/file-container'
import { type FileType, type ExtendedFileType } from '@/type'
import authUser from '@/util/auth-user'
import { type SupabaseClient } from '@supabase/supabase-js'

interface Props {
  searchParams: {
    name: string
  }
}

const getSignedUrls = async (supabase: SupabaseClient, pathList: string[]) => {
  const { data: resultUrls } = await supabase.storage
    .from('video')
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

  if (data === null) return
  let list: FileType[] = data[0].list_image === null ? [] : data[0].list_image.image

  if (name !== undefined) {
    list = list.filter(img => img.name.includes(name))
  }

  const videoPathList = list
    .filter(video => video.fileType === 'video')
    .map(video => `${user?.id}/${video.fileName}/${video.fileName}`)

  const thumbnailPathList = list
    .filter(video => video.fileType === 'video')
    .map(video => `${user?.id}/${video.fileName}/video_thumbnail.png`)

  const listOfVideoUrls = await getSignedUrls(supabase, videoPathList)
  const listOfThumbnailUrls = await getSignedUrls(supabase, thumbnailPathList)

  const imageUrl: ExtendedFileType[] = list
    .filter((item, index) =>
      item.fileType === 'video' &&
      listOfVideoUrls[index] !== undefined &&
      listOfThumbnailUrls[index] !== undefined
    )
    .map((item, index) => ({
      ...item,
      url: listOfVideoUrls[index].signedUrl,
      thumbnailUrl: listOfThumbnailUrls[index].signedUrl
    }))

  return (
    <FileContainer list={imageUrl} />
  )
}

export default page
