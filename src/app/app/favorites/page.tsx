import FileContainer from '@/components/FileContainer'
import { SP_TABLET } from '@/static/static'
import { type FileType, type ExtendedFileType } from '@/type'
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
  const imageUrl: ExtendedFileType[] = []

  const { data } = await supabase
    .from(SP_TABLET.PROFILES)
    .select('list_files')
    .eq('user_id', user?.id)

  if (data === null) return

  let list: FileType[] =
    data[0].list_files === null
      ? []
      : data[0].list_files.image

  if (list.length === 0) {
    return (
      <div className='grid place-content-center md:text-2xl'>
        <div>
          No favorites added
        </div>
      </div>
    )
  }

  if (name !== undefined) {
    list = list.filter(img => img.name.includes(name))
  }

  const filterFavorite = (list: FileType[]) => {
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
