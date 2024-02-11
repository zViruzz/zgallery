/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createBrowserClient } from '@supabase/ssr'
import { getResolutionImage, getResolutionVideo, incrementedName, getVideoThumbnail } from '../util/utils'
import { type User } from '@supabase/supabase-js'
import { type ElementList } from '@/type'

function useUser () {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const getUser = async () => {
    return await supabase.auth.getUser()
  }

  const updateDataBaseList = async (user: User | null, prevList: any, newFile: ElementList) => {
    try {
      await supabase
        .from('data_image')
        .update({
          list_image: {
            image: [
              ...prevList,
              {
                ...newFile,
                favorite: false
              }
            ]
          }
        })
        .eq('user_id', user?.id)
    } catch (error) {
      console.log(error)
    }
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

      const newImage: ElementList = {
        id,
        fileType: 'image',
        name: fileName,
        height,
        width
      }

      await updateDataBaseList(user, prevList, newImage)

      if (error != null) console.error('A ocurido un error al subir la imagen', error)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadVideo = async (file: File) => {
    try {
      const { data: { user } } = await getUser()
      const { width, height } = await getResolutionVideo(file)
      const fileImage = await getVideoThumbnail(file, 0)
      // const FileImageThumbnail = fetch(imgSrc)
      //   .then(async (res) => await res.blob())
      //   .then((blob) => {
      //     const NewFile = new File([blob], 'video_thumbnail', {
      //       type: 'image/png'
      //     })
      //     console.log('NewFile', NewFile)
      //   })

      const { data: column } = await supabase
        .from('data_image')
        .select('list_image')
        .eq('user_id', user?.id)

      const prevList = column[0].list_image === null ? [] : column[0].list_image.image
      const fileName = incrementedName(file.name, prevList)

      const { data: fileResponse, error } = await supabase.storage
        .from('video')
        .upload(`${user?.id}/${fileName}/${fileName}`, file)

      const { data: resThumbnail } = await supabase.storage
        .from('video')
        .upload(`${user?.id}/${fileName}/${fileImage.name}.png`, fileImage)

      //  await supabase.storage
      //   .from('video')
      //   .upload(`${user?.id}/${fileName}/${urlThumbnail}`, file)

      const newVideo: ElementList = {
        id: fileResponse.id,
        fileType: 'video',
        name: fileName,
        width,
        height
      }

      await updateDataBaseList(user, prevList, newVideo)

      if (error != null) console.error('A ocurido un error al subir el video', error)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFile = async (fileName: string | undefined, fileType: 'image' | 'video') => {
    try {
      const { data: { user } } = await getUser()

      if (fileType === 'image') {
        await supabase.storage
          .from('image')
          .remove([`${user?.id}/${fileName}`])
      } else if (fileType === 'video') {
        const { data: dataDelete, error } = await supabase.storage
          .from('video')
          .remove([`${user?.id}/${fileName}`])
        console.log('fileName', fileName)
        console.log('dataDelete', dataDelete)
        console.log('error', error)
      }

      const { data: column } = await supabase
        .from('data_image')
        .select('list_image')
        .eq('user_id', user?.id)

      const prevList = column[0].list_image === null ? [] : column[0].list_image.image

      const newList = prevList.filter(item => item.name !== fileName)

      await supabase
        .from('data_image')
        .update({
          list_image: {
            image: [
              ...newList
            ]
          }
        })
        .eq('user_id', user?.id)
    } catch (error) {
      console.log(error)
    }
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
