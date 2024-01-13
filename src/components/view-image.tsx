import React from 'react'
import Image from 'next/image'

interface Props {
  list: Array<{
    id: string
    name: string
    url: string
  }>
}

function ViewImage ({ list }: Props) {
  return (
    <>
      {list?.map((item, index) => {
        return (
          <div key={index}>
            <Image className='object-cover w-svw h-full rounded-xl' src={item.url} width={200} height={200} alt='' />
          </div>
        )
      })}
    </>
  )
}

export default ViewImage
