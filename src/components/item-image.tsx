import React, { useState } from 'react'
import Image from 'next/image'

interface Props {
  id: string
  name: string
  url: string
  index: number
  width: string
  height: string
}

function ItemImage ({ url, name, id, width, height, index }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <a
      href={url}
      data-pswp-width={width}
      data-pswp-height={height}
      key={id + '-' + index}
      target="_blank"
      rel="noreferrer"
    >
      <div className='overflow-hidden relative h-full bg-primary rounded-xl'>
        <Image
          className={`object-cover w-svw h-full rounded-xl duration-700 ease-in-out 
        ${isLoading ? 'grayscale-[35%] blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
          src={url}
          width={200}
          height={200}
          alt={name}
          onLoad={() => { setIsLoading(false) }}
        />
      </div>

    </a>
  )
}

export default ItemImage
