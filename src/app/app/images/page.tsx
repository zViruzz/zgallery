'use client'
import FileContainer from '@/components/FileContainer'
import AddIcon from '@/components/icons/AddIcon'
import { SORT_TYPE } from '@/static/static'
import type { ExtendedFileType } from '@/type'
import { sortList } from '@/util/utils'
import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Loading from './loading'

interface Props {
  searchParams: {
    name: string
    sort: string
  }
}

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

async function getImages(): Promise<ExtendedFileType[]> {
  const apiUrl = `${DOMAIN_URL}/api/image`

  const res = await fetch(apiUrl, {
    method: 'GET',
    cache: 'no-store'
  })
  const result = await res.json()
  return result.list as ExtendedFileType[]
}

const changePlanBasic = async (supabase: SupabaseClient) => {
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()
    if (!session) {
      console.error('No hay sesión activa')
      return
    }
    if (session.user.user_metadata.user_plan === 'FREE') {
      await supabase.auth.updateUser({
        data: { user_plan: 'BASIC' }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export default function page({ searchParams }: Props) {
  const [list, setList] = useState<ExtendedFileType[]>([])
  const [loading, setLoading] = useState(true)
  const { name, sort } = searchParams

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? (() => { throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined') })(),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? (() => { throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined') })()
    )
    changePlanBasic(supabase)
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getImages().then((res) => {
      let newList = res

      if (name !== undefined) {
        newList = list.filter((img) => img.name.includes(name))
      }

      if (sort !== undefined) {
        if (
          sort !== SORT_TYPE.RECENT &&
          sort !== SORT_TYPE.RECENT_INVERT &&
          sort !== SORT_TYPE.A_Z &&
          sort !== SORT_TYPE.Z_A
        ) { return }

        newList = sortList(res, sort)
      }

      setList(newList)
      setLoading(false)
    })
  }, [name, sort])

  return (
    <>
      {loading
        ? (
          <Loading />
        )
        : list.length === 0
          ? (
            <div className="grid place-content-center md:text-2xl">
              <div>
                Upload image with the{' '}
                <AddIcon className="inline mb-1 md:w-7 md:h-7 h-5 w-5" /> button
              </div>
            </div>
          )
          : (
            <FileContainer list={list} />
          )}
    </>
  )
}
