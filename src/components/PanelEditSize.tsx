import type { ExtendedFileType } from '@/type'
import { type MutableRefObject, useRef } from 'react'
import InputResolution from './InputResolution'
import DownloadIcon from './icons/DownloadIcon'

interface Props {
  selectedItem: MutableRefObject<ExtendedFileType>
  imageTransform: (
    item: ExtendedFileType,
    transform: { width: number; height: number },
  ) => void
}

export default function PanelEditSize({ selectedItem, imageTransform }: Props) {
  const widthRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)

  const handleClickOutside = () => {
    const $panelEdit = document.querySelector('.panel-edit')
    $panelEdit?.classList.remove('flex')
    $panelEdit?.classList.add('hidden')
  }

  return (
    <div className='hidden panel-edit bg-black bg-opacity-30 absolute z-[5999] top-0 left-0 min-w-full h-screen flex-col'>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className='h-full w-full' onClick={handleClickOutside} />
      <div className='bg-neutral-900 w-full h-[11rem] flex flex-col relative'>
        <div className='text-lg flex flex-col  items-center'>
          <h3 className='my-1'>Edit image size</h3>
          <p className='text-sm text-delete-edit'>{selectedItem.current.name}</p>
        </div>
        <div className='flex flex-1'>
          <div className='w-full h-full flex items-center justify-center gap-5'>
            <InputResolution inputRef={widthRef} placeholder='Width' />
            <InputResolution inputRef={heightRef} placeholder='Height' />

            <button
              type='button'
              className='bg-tertiary py-[6px] px-2 rounded-lg block hover:bg-[#930b34] active:bg-[#76092a]'
              onClick={() => {
                const width = Number(widthRef.current?.value)
                const height = Number(heightRef.current?.value)
                imageTransform(selectedItem.current, { width, height })
              }}
            >
              <DownloadIcon width={22} height={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
