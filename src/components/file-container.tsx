'use client'
import FileView from './file-view'
import LightGallery from 'lightgallery/react'

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import video from 'lightgallery/plugins/video'
import vimeoThumbnail from 'lightgallery/plugins/vimeoThumbnail'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import { useCallback, useEffect, useRef } from 'react'
import useUser from '@/hook/useUser'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  list: Array<{
    id: string
    name: string
    fileType: string
    url: string
    width: string
    height: string
    thumbnailUrl?: string
  }>
}

function FileContainer ({ list }: Props) {
  const { deleteFile } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const lightGallery = useRef<any>(null)

  const onInit = useCallback((detail: any) => {
    if (detail !== null) {
      lightGallery.current = detail.instance
    }
  }, [])

  useEffect(() => {
    const nextBtn =
      '<button type="button" aria-label="Next slide" class="lg-delete lg-icon flex justify-center items-center"> <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m18 6-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 0 1-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 0 1-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 6m6 4v7m-4-7v7" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> </button>'

    const $lgContainer = document.querySelector('.lg-toolbar')
    $lgContainer?.insertAdjacentHTML('beforeend', nextBtn)

    const fileType = pathname === '/app/imagen' ? 'image' : 'video'

    document.querySelector('.lg-delete')?.addEventListener('click', () => {
      const elementName = document.querySelector('.lg-sub-html')?.textContent
      if (elementName !== null && elementName !== undefined) {
        deleteFile(elementName, fileType)
          .then(() => {
            lightGallery.current.closeGallery()
          })
          .then(() => {
            router.refresh()
          })
      }
    })
  }, [list])

  return (
    <div>
      <LightGallery
        elementClassNames='gallery-methods-demo gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md'
        speed={500}
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail, video, vimeoThumbnail]}
      >
        {
          list.map((item, index) => {
            return (
              <FileView key={index} index={index} {...item} />
            )
          })
        }
      </LightGallery>

    </div>
  )
}

export default FileContainer
