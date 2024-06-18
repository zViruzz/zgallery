import { type MutableRefObject, useRef } from 'react'
import InputResolution from './InputResolution'
import { type ExtendedFileType } from '@/type'

interface Props {
  selectedItem: MutableRefObject<ExtendedFileType>
  imageTransform: (item: ExtendedFileType, transform: { width: number, height: number }) => void
}

export default function PanelEditImage ({ selectedItem, imageTransform }: Props) {
  const widthRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)

  return (
    <div className='hidden panel-edit bg-black bg-opacity-20 absolute z-[5999] top-0 left-0 min-w-full h-screen items-end'>
      <div className='bg-[#212121] w-full h-[144px] flex flex-col relative'>
        <div className='text-lg flex flex-col  items-center'>
          <h3 className='my-1'>Convert reslution</h3>
          <p className='text-sm text-delete-edit'>
            cattt.png
          </p>
        </div>
        <div className='flex flex-1'>
          <div className='w-full h-full flex items-center justify-center gap-5'>
            <InputResolution
              inputRef={widthRef}
              placeholder='Width'
            />
            <InputResolution
              inputRef={heightRef}
              placeholder='Height'
            />

            <button
              className='bg-tertiary h-12 w-12 rounded-lg block'
              onClick={() => {
                const width = Number(widthRef.current?.value)
                const height = Number(heightRef.current?.value)
                imageTransform(selectedItem.current, { width, height })
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
