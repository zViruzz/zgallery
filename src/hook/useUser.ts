/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'
import { getResolutionImage, incrementedName } from '../util/utils'
import { type User } from '@supabase/supabase-js'
import { type ElementImageList } from '@/type'

function useUser () {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const getUser = async () => {
    return await supabase.auth.getUser()
  }

  const uploadImage = async (file: File) => {
    try {
      const { data: { user } } = await getUser()
      const { width, height } = await getResolutionImage(file)

      const { data: column } = await supabase
        .from('data_image')
        .select('list_image')
        .eq('user_id', user?.id)

      const prevList = column[0].list_image === null ? [] : column[0].list_image.image
      const fileName = incrementedName(file.name, prevList)

      const { data: { id, path }, error } = await supabase.storage
        .from('image')
        .upload(`${user?.id}/${fileName}`, file)

      // const arrayPath = path.split('/')
      // const nameImage = arrayPath[arrayPath.length - 1]

      const newImage = {
        id,
        name: fileName,
        height,
        width
      }

      await updateDatabaseList(user, prevList, newImage)

      if (error != null) console.error('A ocurido un error al subir la imagen', error)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadVideo = async (file: File) => {
    try {
      const { data: { user } } = await getUser()
      const { data, error } = await supabase.storage
        .from('video')
        .upload(`${user?.id}/${file.name}`, file)

      if (error != null) console.error('A ocurido un error al subir el video', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  const updateDatabaseList = async (user: User | null, prevList: any, newImage: ElementImageList) => {
    const { id, name, height, width } = newImage
    await supabase
      .from('data_image')
      .update({
        list_image: {
          image: [
            ...prevList,
            {
              id,
              name,
              height,
              width
            }
          ]
        }
      })
      .eq('user_id', user?.id)
  }

  return {
    supabase,
    uploadImage,
    uploadVideo,
    getUser
  }
}

export default useUser
