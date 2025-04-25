/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { createServerClientHandle, getBucketSize, getListFiles, getUploadLimit, updateDataBaseList } from './supabase'
import { type FileType, type resolutionType } from '@/type'

interface ResponseInterImage {
  data: {
    path: string
  } | null
  error: {
    message: string
    status: number
  } | null
}

export async function interImage (image: File, resolution: resolutionType): Promise<ResponseInterImage> {
  try {
    const supabase = await createServerClientHandle()
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) throw new Error('user not found')

    const userPlan = user?.user_metadata.user_plan
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
    const fileName = incrementedName(image.name, prevList)
    const newSize = prevSize + image.size

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

    const { data, error } = await supabase.storage
      .from('image')
      .upload(`${user?.id}/${fileName}`, image)

    if (error !== null) {
      return {
        data: null,
        error: {
          message: error.message,
          status: 500
        }
      }
    }

    const newImage: FileType = {
      id: (data as any)?.id,
      name: fileName,
      size: image.size,
      fileType: 'image',
      favorite: false,
      fileName,
      ...resolution
    }

    await updateDataBaseList({
      supabase,
      user,
      prevList,
      newFile: newImage,
      size: newSize
    })

    return {
      data,
      error: null

    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error uploading image';
    return {
      data: null,
      error: {
        message: errorMessage,
        status: 500
      }
    }
  }
}
