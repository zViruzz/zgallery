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
import { useEffect } from 'react'
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

  useEffect(() => {
    const nextBtn =
      '<button type="button" aria-label="Next slide" class="lg-delete lg-icon"> todo </button>'

    const $lgContainer = document.querySelector('.lg-toolbar')
    $lgContainer?.insertAdjacentHTML('beforeend', nextBtn)

    document.querySelector('.lg-delete')?.addEventListener('click', () => {
      const elementName = document.querySelector('.lg-sub-html')?.textContent
      if (elementName !== null) {
        console.log('delete')
        deleteFile(elementName, 'video')
          .then(() => {
            router.refresh()
          })
      }
    })
  }, [])

  return (
    <div>
      <LightGallery
        elementClassNames='gallery-methods-demo gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md'
        speed={500}
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
