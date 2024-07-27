import { NextResponse } from 'next/server'
import { interVideo } from '@/services/video'
import { createServerClientHandle, deleteFile } from '@/services/supabase'
import { type ExtendedFileType, type FileType, type resolutionType } from '@/type'
import { SP_TABLET } from '@/static/static'
import { type SupabaseClient } from '@supabase/supabase-js'

export async function GET () {
  const supabase = await createServerClientHandle()
  const { data: { user } } = await supabase.auth.getUser()

  const getSignedUrls = async (supabase: SupabaseClient, pathList: string[]) => {
    const { data: resultUrls } = await supabase.storage
      .from('video')
      .createSignedUrls(pathList, 10000)
    return resultUrls ?? []
  }

  const { data } = await supabase
    .from(SP_TABLET.PROFILES)
    .select('list_files')
    .eq('user_id', user?.id)

  if (data === null) return NextResponse.json({ error: 'is null data' }, { status: 500 })

  let list: FileType[] =
    data[0].list_files === null
      ? []
      : data[0].list_files.image

  if (list.length === 0) {
    return NextResponse.json({ list: [] }, { status: 200 })
  }

  list = list.filter(img => img.fileType === 'video')

  const videoPathList = list
    .filter(video => video.fileType === 'video')
    .map(video => `${user?.id}/${video.fileName}/${video.fileName}`)

  const thumbnailPathList = list
    .filter(video => video.fileType === 'video')
    .map(video => `${user?.id}/${video.fileName}/video_thumbnail.png`)

  const listOfVideoUrls = await getSignedUrls(supabase, videoPathList)
  const listOfThumbnailUrls = await getSignedUrls(supabase, thumbnailPathList)

  if (listOfVideoUrls === null || listOfThumbnailUrls === null) {
    return NextResponse.json({ error: 'is null listOfVideoUrls or listOfThumbnailUrls' }, { status: 500 })
  }

  const videosUrl: ExtendedFileType[] = list
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

  return NextResponse.json({ list: videosUrl })
}

export async function POST (request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('video') as File
    const thumbnail = formData.get('thumbnail') as File
    const resolution = JSON.parse(formData.get('resolution') as string) as resolutionType

    const { data, error } = await interVideo(image, thumbnail, resolution)

    if (error !== null) return NextResponse.json(error)

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE (request: Request) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const fileType = formData.get('fileType') as 'video'

  const { data, error } = await deleteFile(name, fileType)
  if (error !== null) return NextResponse.json(error)

  return NextResponse.json(data)
}
