/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'
import { getResolutionImage, getResolutionVideo, getVideoThumbnail } from '../util/utils'
import { uploadImageSB, uploadRemoveSB, uploadVideoSB } from '@/util/requestManagement'

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
      const resolution = await getResolutionImage(file)

      await uploadImageSB(file, resolution)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadVideo = async (file: File) => {
    try {
      const resolution = await getResolutionVideo(file)
      const thumbnail = await getVideoThumbnail(file, 0)

      await uploadVideoSB(file, thumbnail, resolution)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFile = async (fileName: string, fileType: 'image' | 'video') => {
    await uploadRemoveSB(fileName, fileType)

    // try {
    //   const { data: { user } } = await getUser()

    //   if (fileType === 'image') {
    //     await supabase.storage
    //       .from('image')
    //       .remove([`${user?.id}/${fileName}`])
    //   } else if (fileType === 'video') {
    //     await supabase.storage
    //       .from('video')
    //       .remove([
    //         `${user?.id}/${fileName}/${fileName}`,
    //         `${user?.id}/${fileName}/video_thumbnail.png`,
    //         `${user?.id}/${fileName}`
    //       ])
    //   }

    //   const { data: column } = await supabase
    //     .from('data_image')
    //     .select('list_image')
    //     .eq('user_id', user?.id)

    //   const prevList = column[0].list_image === null ? [] : column[0].list_image.image

    //   const newList = prevList.filter(item => item.name !== fileName)

    //   await supabase
    //     .from('data_image')
    //     .update({
    //       list_image: {
    //         image: [
    //           ...newList
    //         ]
    //       }
    //     })
    //     .eq('user_id', user?.id)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return {
    supabase,
    uploadImage,
    uploadVideo,
    deleteFile,
    getUser
  }
}

export default useUser
