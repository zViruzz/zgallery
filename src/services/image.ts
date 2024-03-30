/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { type User } from '@supabase/supabase-js'
import { createServerClientHandle, updateDataBaseList } from './supabase'
import { SP_TABLET } from '@/static/static'

export async function interImage (image: File, resolution: any) {
  try {
    const supabase = await createServerClientHandle()
    const { data: { user } } = await supabase.auth.getUser()

    const getPrevList = async (user: User | null) => {
      const { data: column } = await supabase
        .from(SP_TABLET.PROFILES)
        .select('list_files')
        .eq('user_id', user?.id)

      if (column === null) return []
      const prevList = column[0].list_files === null ? [] : column[0].list_files.image

      return prevList
    }

    const prevList = await getPrevList(user)
    const fileName = incrementedName(image.name, prevList)

    const { data, error } = await supabase.storage
      .from('image')
      .upload(`${user?.id}/${fileName}`, image)

    if (error !== null) return { data: null, error }

    const newImage: File = {
      id: (data as any)?.id,
      fileType: 'image',
      name: fileName,
      fileName,
      ...resolution
    }

    await updateDataBaseList(supabase, user, prevList, newImage)

    return { data, error: null }
  } catch (error) {
    console.error(error)
    return { data: null, error }
  }
}
