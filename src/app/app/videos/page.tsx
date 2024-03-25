import FileContainer from '@/components/file-container'
import { SORT_TYPE } from '@/static/static'
import { type FileType, type ExtendedFileType } from '@/type'
import authUser from '@/util/auth-user'
import { sortList } from '@/util/utils'
import { type SupabaseClient } from '@supabase/supabase-js'

interface Props {
  searchParams: {
    name: string
    sort: string
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
  const { name, sort } = searchParams

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  if (data === null) return

  let list: FileType[] =
    data[0].list_image === null
      ? []
      : data[0].list_image.image

  list = list.filter(img => img.fileType === 'video')

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

  if (sort !== undefined) {
    if (
      sort !== SORT_TYPE.RECENT &&
      sort !== SORT_TYPE.RECENT_INVERT &&
      sort !== SORT_TYPE.A_Z &&
      sort !== SORT_TYPE.Z_A
    ) return

    const newList = sortList(imageUrl, sort)
    return (
      <FileContainer list={newList} />
    )
  }

  return (
    <FileContainer list={imageUrl} />
  )
}

export default page
