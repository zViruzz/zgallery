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
import { useCallback, useEffect, useRef, useState } from 'react'
import useUser from '@/hook/useUser'
import { usePathname, useRouter } from 'next/navigation'
import { type ExtendedFileType } from '@/type'

interface Props {
  list: ExtendedFileType[]
}

function FileContainer ({ list }: Props) {
  const [hiddenError, setHiddenError] = useState(true)
  const [nameTag, setNameTag] = useState('')
  const { deleteFile, favoriteFile } = useUser()
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
    const favoriteBtn =
      '<button type="button" aria-label="Next slide" class="lg-favorite lg-icon flex justify-center items-center"> <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 6c-1.8-2.097-4.806-2.745-7.06-.825-2.255 1.92-2.573 5.131-.802 7.402 1.472 1.888 5.927 5.87 7.387 7.16.163.144.245.216.34.245a.456.456 0 0 0 .258 0c.095-.029.176-.1.34-.245 1.46-1.29 5.915-5.272 7.387-7.16 1.77-2.27 1.492-5.502-.802-7.402C16.755 3.275 13.8 3.903 12 6Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'

    const $lgContainer = document.querySelector('.lg-toolbar')
    $lgContainer?.insertAdjacentHTML('beforeend', favoriteBtn)
    $lgContainer?.insertAdjacentHTML('beforeend', nextBtn)

    document.querySelector('.lg-delete')?.addEventListener('click', () => {
      const elementName = document.querySelector('.lg-file-name')?.textContent
      if (elementName !== null && elementName !== undefined) {
        setNameTag(elementName)
        setHiddenError(false)
      }
    })

    document.querySelector('.lg-favorite')?.addEventListener('click', () => {
      const elementName = document.querySelector('.lg-file-name')?.textContent
      if (elementName !== null && elementName !== undefined) {
        console.log('favorite ', elementName)
        favoriteFile(elementName)
      }
    })
  }, [list, hiddenError])

  const handleClickDelete = () => {
    const fileType = pathname === '/app/imagen' ? 'image' : 'video'

    deleteFile(nameTag, fileType)
      .then(() => {
        setHiddenError(true)
      })
      .then(() => {
        router.refresh()
      })
  }

  return (
    <div>
      <div className={`${hiddenError ? 'hidden' : 'grid'} bg-black bg-opacity-20 absolute z-[5999] top-0 left-0 min-w-full h-screen place-content-center`}>
        <div className='bg-black flex flex-col p-11 gap-5  rounded-2xl relative'>
            <button
              className='absolute px-5 py-3 right-0 top-0'
              onClick={() => { setHiddenError(true) }}
              >
              X
            </button>
          <div className='text-xl'>
            <p>
              {`Are you sure you want to delete ${nameTag}?`}
            </p>
          </div>
          <div className='grid place-content-center'>
            <button
              className='bg-tertiary p-3 rounded-lg block'
              onClick={handleClickDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <LightGallery
        elementClassNames='gallery-methods-demo gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md'
        speed={500}
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail, video, vimeoThumbnail]}
      >
        {
          list.map((item, index) => {
            return (
              <FileView key={index} {...item} />
            )
          })
        }
      </LightGallery>

    </div>
  )
}

export default FileContainer
