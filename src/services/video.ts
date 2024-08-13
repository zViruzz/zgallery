/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { createServerClientHandle, getBucketSize, getListFiles, getUploadLimit, updateDataBaseList } from './supabase'
import { type resolutionType, type FileType } from '@/type'

interface ResponseInterVideo {
  data: {
    path: string
  } | null
  error: {
    message: string
    status: number
  } | null
}

export async function interVideo (video: File, thumbnail: File, resolution: resolutionType): Promise<ResponseInterVideo> {
  try {
    const supabase = await createServerClientHandle()
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) throw new Error('user not found')

    const userPlan = user.user_metadata.user_plan
    const planLimit = await getUploadLimit(user)

    if (userPlan === undefined) {
      return {
        data: null,
        error: {
          message: 'User plan is undefined',
          status: 500
        }
      }
    }

    const prevList = await getListFiles(supabase, user)
    const prevSize = await getBucketSize(supabase, user)
    const fileName = incrementedName(video.name, prevList)
    const newSize = prevSize + video.size

    if (planLimit < newSize) {
      const message = `You have exceeded the limit of your ${userPlan} plan. Please upgrade to continue.`
      return {
        data: null,
        error: {
          message,
          status: 402
        }
      }
    }

    const { data: responseVideo, error: errorVideo } = await supabase.storage
      .from('video')
      .upload(`${user?.id}/${fileName}/${fileName}`, video)

    const { error: errorThumbnail } = await supabase.storage
      .from('video')
      .upload(`${user?.id}/${fileName}/${thumbnail.name}.png`, thumbnail)

    if (errorVideo !== null) {
      return {
        data: null,
        error: {
          message: errorVideo.message,
          status: 500
        }
      }
    }

    if (errorThumbnail !== null) {
      return {
        data: null,
        error: {
          message: errorThumbnail.message,
          status: 500
        }
      }
    }

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
  } catch (err) {
    return {
      data: null,
      error: {
        message: 'error while loading',
        status: 500
      }
    }
  }
}
