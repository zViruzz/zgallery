import React from 'react'

interface Props {
  handleClickDelete: () => void
}

function DeletionWarning ({ handleClickDelete }: Props) {
  return (
    <div className={'hidden message-delete bg-black bg-opacity-20 absolute z-[5999] top-0 left-0 min-w-full h-screen place-content-center'}>
      <div className='bg-black flex flex-col p-11 gap-5  rounded-2xl relative'>
        <button
          className='absolute px-5 py-3 right-0 top-0'
          onClick={() => {
            const $messageDelete = document.querySelector('.message-delete')
            $messageDelete?.classList.remove('grid')
            $messageDelete?.classList.add('hidden')
          }}
        >

        </button>
        <div className='text-xl'>
          <p className='text-delete'>
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
  )
}

export default DeletionWarning
