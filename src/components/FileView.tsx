import { useState } from 'react'
import Image from 'next/image'
import { type ExtendedFileType } from '@/type'

function FileView ({ url, fileName, name, fileType, width, height, thumbnailUrl }: ExtendedFileType) {
  const [isLoading, setIsLoading] = useState(true)

  if (fileType === 'image') {
    return (
      <a
        href={url}
        data-sub-html={`<h1 class="lg-file-name hidden">${fileName}</h1><h1 class="lg-alias">${name}</h1>`}
      >
        <div className='overflow-hidden relative h-full bg-primary rounded-xl hover:scale-105 transition-all hover:shadow-search ease-in-out'>
          {
            fileName.endsWith('svg')
              ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={`object-cover w-svw h-full rounded-xl duration-700 ease-in-out 
                  ${isLoading ? 'grayscale-[35%] blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
                  src={url}
                  width={300}
                  height={300}
                  alt={name}
                  onLoad={() => { setIsLoading(false) }}
                />
                )
              : (
                <Image
                  className={`object-cover w-svw h-full rounded-xl duration-700 ease-in-out 
                  ${isLoading ? 'grayscale-[35%] blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
                  src={url}
                  width={300}
                  height={300}
                  alt={name}
                  onLoad={() => { setIsLoading(false) }}
                />
                )
          }
        </div>

      </a>
    )
  } else if (fileType === 'video' && thumbnailUrl !== undefined) {
    const source = `{"source": [{"src":"${url}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true, "autoplay": false}}`

    return (
      <a
        data-lg-size={`${width}-${height}`}
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        data-video={source}
        data-poster={thumbnailUrl}
        data-sub-html={`<h1 class="hidden">${fileName}</h1><h1 class="lg-alias">${name}</h1>`}
      >
        <div className='overflow-hidden relative h-full bg-primary rounded-xl hover:scale-105 transition-all hover:shadow-search ease-in-out'>
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
