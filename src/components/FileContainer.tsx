'use client'
import FileView from './FileView'
import LightGallery from 'lightgallery/react'

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import video from 'lightgallery/plugins/video'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'

import { buttonDelete, buttonEditSize, buttonFavorite, iconFavoriteFalse, iconFavoriteTrue } from './strings'
import { useCallback, useRef } from 'react'
import { type ExtendedFileType } from '@/type'
import DeletionWarning from './DeletionWarning'
import useUser from '@/hook/useUser'
import PanelEditImage from './PanelEditImage'

interface Props {
  list: ExtendedFileType[]
}
function FileContainer ({ list }: Props) {
  const { deleteFile, favoriteFile, getNewResolutionImage } = useUser()
  const lightGallery = useRef<any>(null)
  const selectedItem = useRef<ExtendedFileType>({
    id: '',
    fileType: 'image',
    favorite: false,
    name: '',
    fileName: '',
    height: 0,
    width: 0,
    size: 0,
    url: ''
  })

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
        lightGallery.current.closeGallery()
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
    favoriteFile(fileName)
      .then(() => {
        const $btnFavorite = document.querySelector('#lg-favorite')
        if ($btnFavorite === null) return
        $btnFavorite.children[0].id === 'favorite-true'
          ? $btnFavorite.innerHTML = iconFavoriteFalse
          : $btnFavorite.innerHTML = iconFavoriteTrue
      })
  }

  const afterLoad = (element: any) => {
    const select = list[element.index]
    selectedItem.current = select

    const btnExits =
      (document.querySelector('#lg-delete') !== null) &&
      (document.querySelector('#lg-favorite') !== null) &&
      (document.querySelector('#lg-edit') !== null)

    if (!btnExits) {
      const $lgContainer = document.querySelector('.lg-toolbar')
      $lgContainer?.insertAdjacentHTML('beforeend', buttonFavorite)
      $lgContainer?.insertAdjacentHTML('beforeend', buttonDelete)
      $lgContainer?.insertAdjacentHTML('beforeend', buttonEditSize)
    }

    const $btnFavorite = document.querySelector('#lg-favorite')
    if ($btnFavorite === null) return

    select.favorite
      ? $btnFavorite.innerHTML = iconFavoriteTrue
      : $btnFavorite.innerHTML = iconFavoriteFalse

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
      <PanelEditImage
        selectedItem={selectedItem}
        imageTransform={getNewResolutionImage}
      />
      <DeletionWarning
        handleClickDelete={handleClickDelete}
      />
      <LightGallery
        elementClassNames='gallery-methods-demo gallery-view grid grid-cols-gallery grid-rows-gallery [&>div]:bg-black [&>div]:rounded-xl gap-5 overflow-y-auto px-7 pr-4 mr-3 md:pl-14 md:mr-6 md:pr-8 md:grid-cols-gallery_md md:grid-rows-gallery_md py-3'
        speed={500}
        onBeforeSlide={beforeLoad}
        onAfterSlide={afterLoad}
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail, video]}
      >
        {
          list.map((item) => {
            return (
              <FileView key={item.id} {...item} />
            )
          })
        }
      </LightGallery>

    </>
  )
}

export default FileContainer
