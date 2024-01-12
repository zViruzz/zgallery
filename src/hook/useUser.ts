/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'

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
      const { data, error } = await supabase.storage
        .from('image')
        .upload(`${user?.id}/${file.name}`, file)

      if (error != null) console.error('A ocurido un error al subir la imagen', error)
      return { data, error }
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

  return {
    supabase,
    uploadImage,
    uploadVideo,
    getUser
  }
}

export default useUser
