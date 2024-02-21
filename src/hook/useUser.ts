/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'
import { getResolutionImage, getResolutionVideo, getVideoThumbnail } from '../util/utils'
import { updatingFileFavorites, uploadImageSB, uploadRemoveSB, uploadVideoSB } from '@/util/request-management'

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
  }

  const favoriteFile = async (fileName: string) => {
    await updatingFileFavorites(fileName)
  }

  return {
    supabase,
    uploadImage,
    uploadVideo,
    deleteFile,
    favoriteFile,
    getUser
  }
}

export default useUser
