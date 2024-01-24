'use client'
import ItemImage from './item-image'
import { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

interface Props {
  list: Array<{
    id: string
    name: string
    url: string
    width: string
    height: string
  }>
}

function ViewImage ({ list }: Props) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + 'gallery',
      children: 'a',
      showHideAnimationType: 'zoom',
      wheelToZoom: true,
      imageClickAction: 'next',
      tapAction: 'next',
      pswpModule: async () => await import('photoswipe')
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
      lightbox = null
    }
  }, [])

  return (
    <div
      id='gallery'
      className='gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md'>
      {
        list.map((item, index) => {
          return (
            <ItemImage key={index} index={index} {...item} />
          )
        })
      }

    </div>
  )
}

export default ViewImage
