/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { createServerClientHandle, getBucketSize, getListFiles, updateDataBaseList } from './supabase'
import { type FileType, type resolutionType } from '@/type'

const PLAN_LIMIT = {
  FREE: 1700000,
  PREMIUN: 100000000
}

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
  const supabase = await createServerClientHandle()
  const { data: { user } } = await supabase.auth.getUser()

  const userPlan = user?.user_metadata.user_plan

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

  if (userPlan === 'FREE' && PLAN_LIMIT.FREE < newSize) {
    console.log('Free plan limit exceeded')

    return {
      data: null,
      error: {
        message: 'You have exceeded the limit of your free plan. Please upgrade to continue.',
        status: 402
      }
    }
  }

  if (userPlan === 'PREMIUN' && PLAN_LIMIT.PREMIUN < newSize) {
    console.log('Premiun plan limit exceeded')
    return {
      data: null,
      error: {
        message: 'You have exceeded the limit of your premiun plan. Please upgrade to continue.',
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
}
