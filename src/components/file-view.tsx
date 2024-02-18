import { useState } from 'react'
import Image from 'next/image'

interface Props {
  id: string
  name: string
  url: string
  fileType: string
  index: number
  width: string
  height: string
  thumbnailUrl?: string
}

function FileView ({ url, name, fileType, id, width, height, thumbnailUrl }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  if (fileType === 'image') {
    return (
      <a href={url}>
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
  } else if (fileType === 'video' && thumbnailUrl !== undefined) {
    const source = `{"source": [{"src":"${url}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`

    return (
      <a
        data-lg-size={`${width}-${height}`}
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        data-video={source}
        data-poster={thumbnailUrl}
      >
        <div className='overflow-hidden relative h-full bg-primary rounded-xl'>
          <Image
            className={`object-cover w-svw h-full rounded-xl duration-700 ease-in-out 
            ${isLoading ? 'grayscale-[35%] blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
            src={thumbnailUrl}
            width={200}
            height={200}
            alt={name}
            onLoad={() => { setIsLoading(false) }}
          />
        </div>

      </a>
    )
  }
}

export default FileView
