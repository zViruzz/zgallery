'use client'
import FileView from './FileView'

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import video from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'

import useUser from '@/hook/useUser'
import type { ExtendedFileType } from '@/type'

import type { LightGallery as LightGalleryType } from 'lightgallery/lightgallery'
import LightGallery from 'lightgallery/react'
import { usePathname } from 'next/navigation'
import { useCallback, useRef } from 'react'
import DeletionWarning from './DeletionWarning'
import PanelEditSize from './PanelEditSize'
import {
  buttonDelete,
  buttonEditSize,
  buttonEditSizeDisabled,
  buttonFavorite,
  iconFavoriteFalse,
  iconFavoriteTrue,
} from './strings'

interface Props {
  list: ExtendedFileType[]
}

// TODO: Arreglar el problema de fovoritos o el refresh
function FileContainer({ list }: Props) {
  const { deleteFile, favoriteFile, imageTransform, getUser } = useUser()
  const pathname = usePathname()
  const lightGallery = useRef<LightGalleryType | null>(null)
  const selectedItem = useRef<ExtendedFileType>({
    id: '',
    fileType: 'image',
    favorite: false,
    name: '',
    fileName: '',
    height: 0,
    width: 0,
    size: 0,
    url: '',
  })
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onInit = useCallback((detail: any) => {
    if (detail !== null) {
      lightGallery.current = detail.instance
    }
  }, [])

  const handleClickDelete = () => {
    const fileType = selectedItem.current.fileType
    const fileName = selectedItem.current.fileName

    deleteFile(fileName, fileType)
      .then(() => {
        const $messageDelete = document.querySelector('.message-delete')
        $messageDelete?.classList.remove('grid')
        $messageDelete?.classList.add('hidden')
        lightGallery.current?.closeGallery()
      })
      .then(() => {
        location.reload()
      })
  }

  const onClickDelete = () => {
    const $messageDelete = document.querySelector('.message-delete')
    $messageDelete?.classList.remove('hidden')
    $messageDelete?.classList.add('grid')

    const $textDelete = document.querySelector('.text-delete')
    if ($textDelete !== null) {
      $textDelete.innerHTML = `Are you sure you want to delete ${selectedItem.current.fileName}?`
    }
  }

  const onClickEditSize = () => {
    const $panelEdit = document.querySelector('.panel-edit')
    $panelEdit?.classList.remove('hidden')
    $panelEdit?.classList.add('flex')

    const $textDelete = document.querySelector('.text-delete-edit')
    if ($textDelete !== null) {
      $textDelete.innerHTML = `${selectedItem.current.fileName}`
    }
  }

  const onClickFavorite = () => {
    const fileName = selectedItem.current.fileName
    const $btnFavorite = document.querySelector('#lg-favorite')

    if ($btnFavorite === null) return
    const favorite = $btnFavorite.children[0].id === 'favorite-true' ? 'false' : 'true'

    favoriteFile(fileName, favorite).then(() => {
      const $btnFavorite = document.querySelector('#lg-favorite')
      if ($btnFavorite === null) return
      $btnFavorite.children[0].id === 'favorite-true'
      if ($btnFavorite.children[0].id === 'favorite-true') {
        $btnFavorite.innerHTML = iconFavoriteFalse
      } else {
        $btnFavorite.innerHTML = iconFavoriteTrue
      }
      location.reload()
    })
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const afterLoad = async (element: any) => {
    const {
      data: { user },
    } = await getUser()
    const userPlan = user?.user_metadata.user_plan
    const select = list[element.index]
    if (select === undefined) return
    selectedItem.current = select

    if (document.querySelector('#lg-edit') === null && pathname === '/app/images') {
      const $lgContainer = document.querySelector('.lg-toolbar')
      if (userPlan !== 'PREMIUN') {
        $lgContainer?.insertAdjacentHTML('beforeend', buttonEditSizeDisabled)
      } else {
        $lgContainer?.insertAdjacentHTML('beforeend', buttonEditSize)
      }
    }

    const btnExits =
      document.querySelector('#lg-delete') !== null &&
      document.querySelector('#lg-favorite') !== null

    if (!btnExits) {
      const $lgContainer = document.querySelector('.lg-toolbar')
      $lgContainer?.insertAdjacentHTML('beforeend', buttonFavorite)
      $lgContainer?.insertAdjacentHTML('beforeend', buttonDelete)
    }

    const $btnFavorite = document.querySelector('#lg-favorite')
    if ($btnFavorite === null) return

    select.favorite
    if (select.favorite) {
      $btnFavorite.innerHTML = iconFavoriteTrue
    } else {
      $btnFavorite.innerHTML = iconFavoriteFalse
    }

    document.querySelector('#lg-delete')?.addEventListener('click', onClickDelete)
    document.querySelector('#lg-favorite')?.addEventListener('click', onClickFavorite)
    document.querySelector('#lg-edit')?.addEventListener('click', onClickEditSize)
  }

  const beforeLoad = () => {
    document.querySelector('#lg-delete')?.removeEventListener('click', onClickDelete)
    document.querySelector('#lg-favorite')?.removeEventListener('click', onClickFavorite)
    document.querySelector('#lg-edit')?.removeEventListener('click', onClickEditSize)
  }

  return (
    <>
      <PanelEditSize selectedItem={selectedItem} imageTransform={imageTransform} />
      <DeletionWarning handleClickDelete={handleClickDelete} />
      <LightGallery
        elementClassNames='gallery-methods-demo gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md py-3'
        speed={500}
        onBeforeSlide={beforeLoad}
        onAfterSlide={afterLoad}
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail, video]}
      >
        {list.map((item) => {
          return <FileView key={item.id} {...item} />
        })}
      </LightGallery>
    </>
  )
}

export default FileContainer
