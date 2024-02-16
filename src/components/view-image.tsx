'use client'
import ItemImage from './item-image'
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
import { useRouter } from 'next/navigation'

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

function ViewImage ({ list }: Props) {
  const { deleteFile } = useUser()
  const router = useRouter()
  const lightGallery = useRef<any>(null)

  const onInit = useCallback((detail: any) => {
    if (detail !== null) {
      lightGallery.current = detail.instance
    }
  }, [])

  useEffect(() => {
    const nextBtn =
      '<button type="button" aria-label="Next slide" class="lg-delete lg-icon"> todo </button>'

    const $lgContainer = document.querySelector('.lg-toolbar')
    $lgContainer?.insertAdjacentHTML('beforeend', nextBtn)
  }, [list])

  const onSlideItemLoad = (detail) => {
    // console.log('🚀 ~ onAfterOpen ~ detail:', detail)
    const indexItem = detail.index
    const ele = list[indexItem]

    document.querySelector('.lg-delete')?.addEventListener('click', () => {
      const elementName = document.querySelector('.lg-sub-html')?.textContent
      if (elementName !== null && elementName !== undefined) {
        console.log('delete')
        deleteFile(ele.name, 'video')
          .then(() => {
            router.refresh()
            lightGallery.current.refresh()
          })
      }
    })
  }

  return (
    <div>
      <LightGallery
        elementClassNames='gallery-methods-demo gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md'
        speed={500}
        onAfterAppendSubHtml={onSlideItemLoad}
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail, video, vimeoThumbnail]}
      >
        {
          list.map((item, index) => {
            return (
              <ItemImage key={index} index={index} {...item} />
            )
          })
        }
      </LightGallery>

    </div>
  )
}

export default ViewImage
