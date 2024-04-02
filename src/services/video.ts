/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { createServerClientHandle, getBucketSize, getListFiles, updateDataBaseList } from './supabase'
import { type resolutionType, type FileType } from '@/type'

export async function interVideo (video: File, thumbnail: File, resolution: resolutionType) {
  try {
    const supabase = await createServerClientHandle()
    const { data: { user } } = await supabase.auth.getUser()

    const prevList = await getListFiles(supabase, user)
    const prevSize = await getBucketSize(supabase, user)
    const fileName = incrementedName(video.name, prevList)
    const newSize = prevSize + video.size

    const { data: responseVideo, error } = await supabase.storage
      .from('video')
      .upload(`${user?.id}/${fileName}/${fileName}`, video)

    await supabase.storage
      .from('video')
      .upload(`${user?.id}/${fileName}/${thumbnail.name}.png`, thumbnail)

    if (error !== null) return { data: null, error }

    const newVideo: FileType = {
      id: (responseVideo as any)?.id,
      fileType: 'video',
      favorite: false,
      name: fileName,
      size: video.size,
      fileName,
      ...resolution
    }

    await updateDataBaseList({
      supabase,
      user,
      prevList,
      newFile: newVideo,
      size: newSize
    })

    return { data: responseVideo, error: null }
  } catch (error) {
    console.error(error)
    return { data: null, error }
  }
}
