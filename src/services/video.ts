/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { incrementedName } from '@/util/utils'
import { type User } from '@supabase/supabase-js'
import { createServerClientHandle, updateDataBaseList } from './supabase'
import { SP_TABLET } from '@/static/static'

export async function interVideo (video: File, thumbnail: File, resolution: any) {
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
    const fileName = incrementedName(video.name, prevList)

    const { data: responseVideo, error } = await supabase.storage
      .from('video')
      .upload(`${user?.id}/${fileName}/${fileName}`, video)

    await supabase.storage
      .from('video')
      .upload(`${user?.id}/${fileName}/${thumbnail.name}.png`, thumbnail)

    if (error !== null) return { data: null, error }

    const newVideo: File = {
      id: (responseVideo as any)?.id,
      fileType: 'video',
      name: fileName,
      fileName,
      ...resolution
    }

    await updateDataBaseList(supabase, user, prevList, newVideo)

    return { data: responseVideo, error: null }
  } catch (error) {
    console.error(error)
    return { data: null, error }
  }
}
