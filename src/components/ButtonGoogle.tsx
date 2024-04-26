import React from 'react'
import GoogleIcon from './Icons/GoogleIcon'

interface Props {
  onClick: () => void
}

function ButtonGoogle ({ onClick }: Props) {
  return (
    <button
      className="bg-neutral-800 hover:bg-neutral-900 cursor-pointer px-4 py-2 font-semibold items-center  rounded text-base font-sans flex gap-5"
      onClick={onClick}
      type='button'
    >
      <div className='flex gap-3 items-center '>
        <GoogleIcon />
        <span>Google</span>
      </div>
    </button>
  )
}

export default ButtonGoogle
