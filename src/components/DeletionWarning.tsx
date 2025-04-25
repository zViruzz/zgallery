import React from 'react'
import CloseIcon from './icons/CloseIcon'

interface Props {
  handleClickDelete: () => void
}

function DeletionWarning({ handleClickDelete }: Props) {
  return (
    <div className='hidden message-delete bg-black bg-opacity-50 absolute z-[5999] top-0 left-0 min-w-full h-screen place-content-center p-[3%] md:p-0'>
      <div className='bg-black flex flex-col p-7 md:p-11 gap-5 rounded-2xl relative border border-neutral-800'>
        <button
          type='button'
          className='absolute px-3 py-3 right-0 top-0'
          onClick={() => {
            const $messageDelete = document.querySelector('.message-delete')
            $messageDelete?.classList.remove('grid')
            $messageDelete?.classList.add('hidden')
          }}
        >
          <CloseIcon className='w-5 h-5' />
        </button>
        <div className='text-lg md:text-xl'>
          <p className='text-delete'>
          </p>
        </div>
        <div className='grid place-content-center'>
          <button
            type='button'
            className='bg-tertiary py-2 px-3 rounded-lg block'
            onClick={handleClickDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletionWarning
