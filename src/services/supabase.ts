/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ElementList } from '@/type'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function createServerClientHandle () {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return cookieStore.get(name)?.value
        },
        set (name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove (name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )

  return supabase
}

export async function updateDataBaseList (supabase: any, user: User | null, prevList: any, newFile: ElementList) {
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

export async function deleteFile (fileName: string, fileType: 'image' | 'video') {
  try {
    const supabase = await createServerClientHandle()
    const { data: { user } } = await supabase.auth.getUser()

    const getPrevList = async (user: User | null) => {
      const { data: column } = await supabase
        .from('data_image')
        .select('list_image')
        .eq('user_id', user?.id)

      if (column === null) return []
      const prevList: ElementList[] = column[0].list_image === null ? [] : column[0].list_image.image

      return prevList
    }
    const prevList = await getPrevList(user)

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

    if (fileType === 'image') {
      const { data, error } = await supabase.storage
        .from('image')
        .remove([`${user?.id}/${fileName}`])

      if (error !== null) return { data: null, error }
      return { data, error: null }
    } else {
      const { data, error } = await supabase.storage
        .from('video')
        .remove([
        `${user?.id}/${fileName}/${fileName}`,
        `${user?.id}/${fileName}/video_thumbnail.png`,
        `${user?.id}/${fileName}`
        ])

      if (error !== null) return { data: null, error }
      return { data, error: null }
    }
  } catch (error) {
    console.log(error)
    return { data: null, error }
  }
}
