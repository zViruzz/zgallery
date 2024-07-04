/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'
import { changeResolution, getResolutionImage, getResolutionVideo, getVideoThumbnail } from '../util/utils'
import { updatingFileFavorites, uploadImageSB, uploadRemoveSB, uploadVideoSB } from '@/util/request-management'
import { useNotificationContext } from '@/context/notification'
import { useRouter } from 'next/navigation'
import { type ExtendedFileType } from '@/type'

function useUser () {
  const { handleNotification } = useNotificationContext()
  const router = useRouter()

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
      const result = await uploadImageSB(file, resolution)

      if (result.error === true) {
        handleNotification({ message: result.message, type: 'ERROR' })
      } else {
        router.refresh()
        handleNotification({ message: `El archivo ${file.name} se envio correctamente`, type: 'DONE' })
      }

      return result
    } catch (error) {
      console.log(error)
    }
  }

  const imageTransform = async (file: ExtendedFileType, transform: { width: number, height: number }) => {
    try {
      const { data: { user } } = await getUser()

      const { data } = await supabase.storage
        .from('image')
        .createSignedUrl(`${user?.id}/${file.fileName}`, 2000, {
          transform
        })

      const imageUrl = data?.signedUrl
      if (imageUrl === undefined) return

      const url = await changeResolution(imageUrl, transform)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.fileName)
      document.body.appendChild(link)
      link.click()
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
    imageTransform,
    getUser
  }
}

export default useUser
