/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { createServerClientHandle, getBucketSize, getListFiles, updateDataBaseList } from './supabase'
import { type FileType, type resolutionType } from '@/type'

export async function interImage (image: File, resolution: resolutionType) {
  try {
    const supabase = await createServerClientHandle()
    const { data: { user } } = await supabase.auth.getUser()

    const prevList = await getListFiles(supabase, user)
    const prevSize = await getBucketSize(supabase, user)
    const fileName = incrementedName(image.name, prevList)
    const newSize = prevSize + image.size

    const { data, error } = await supabase.storage
      .from('image')
      .upload(`${user?.id}/${fileName}`, image)

    if (error !== null) return { data: null, error }

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

    return { data, error: null }
  } catch (error) {
    console.error(error)
    return { data: null, error }
  }
}
