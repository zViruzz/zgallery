'use client'
import FileContainer from '@/components/FileContainer'
import { SORT_TYPE } from '@/static/static'
import { type ExtendedFileType } from '@/type'
import { sortList } from '@/util/utils'
import { useEffect, useState } from 'react'
import Loading from './loading'
import AddIcon from '@/components/icons/AddIcon'

interface Props {
  searchParams: {
    name: string
    sort: string
  }
}

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

async function getVideos (): Promise<ExtendedFileType[]> {
  const apiUrl = `${DOMAIN_URL}/api/video`

  const res = await fetch(apiUrl, {
    method: 'GET',
    cache: 'no-store'
  })
  const result = await res.json()
  return result.list as ExtendedFileType[]
}

export default function page ({ searchParams }: Props) {
  const [list, setList] = useState<ExtendedFileType[]>([])
  const [loading, setLoading] = useState(true)
  const { name, sort } = searchParams

  useEffect(() => {
    getVideos()
      .then(res => {
        let newList = res

        if (name !== undefined) {
          newList = list.filter(video => video.name.includes(name))
        }

        if (sort !== undefined) {
          if (
            sort !== SORT_TYPE.RECENT &&
            sort !== SORT_TYPE.RECENT_INVERT &&
            sort !== SORT_TYPE.A_Z &&
            sort !== SORT_TYPE.Z_A
          ) return

          newList = sortList(res, sort)
        }

        setList(newList)
        setLoading(false)
      })
  }, [name, sort])

  return (
    <>
      {
        loading
          ? <Loading />
          : list.length === 0
            ? <div className='grid place-content-center md:text-2xl'>
              <div>
                Upload videos with the <AddIcon className='inline mb-1 md:w-7 md:h-7 h-5 w-5' /> button
              </div>
            </div>
            : <FileContainer list={list} />
      }
    </>
  )
}
