'use client'
import 'photoswipe/style.css'
import { useEffect } from 'react'
import useUser from '@/hook/useUser'
import ItemImage from './item-image'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { useRouter } from 'next/navigation'

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
  const { deleteFile } = useUser()
  const router = useRouter()

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

    lightbox.on('uiRegister', function () {
      lightbox.pswp.ui.registerElement({
        name: 'download-button',
        order: 8,
        isButton: true,
        tagName: 'a',

        // SVG with outline
        html: {
          isCustomSVG: true,
          inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: 'pswp__icn-download'
        },

        // Or provide full svg:
        // html: '<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" class="pswp__icn"><path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" /></svg>',

        // Or provide any other markup:
        // html: '<i class="fa-solid fa-download"></i>'

        onInit: (el, pswp) => {
          el.setAttribute('download', '')
          el.setAttribute('target', '_blank')
          el.setAttribute('rel', 'noopener')

          pswp.on('change', () => {
            el.href = pswp.currSlide.data.src
          })
        }
      })

      lightbox.pswp.ui.registerElement({
        name: 'delete-file',
        ariaLabel: 'Delete file',
        order: 9,
        isButton: true,
        html: {
          isCustomSVG: true,
          // inner: '<svg fill="#fff" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><path d="M22 5a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h5a1 1 0 0 1 1 1ZM4.934 21.071 4 8h16l-.934 13.071a1 1 0 0 1-1 .929H5.931a1 1 0 0 1-.997-.929ZM15 18a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0Zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0Zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0Z"/></svg>',
          inner: '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" id="pswp__icn-delete"/>',
          outlineID: 'pswp__icn-delete'
        },

        onClick: async function (event, el, pswp) {
          const fileName = pswp.getItemData(pswp.currIndex).alt
          await deleteFile(fileName)
          pswp.close()
          router.refresh()
        }
      })
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
