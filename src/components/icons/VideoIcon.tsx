import type { SVGProps } from 'react'

const VideoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
    {...props}
  >
    <g stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
      <path d='M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z' />
      <path
        strokeMiterlimit={10}
        d='M9.1 12v-1.48c0-1.91 1.35-2.68 3-1.73l1.28.74 1.28.74c1.65.95 1.65 2.51 0 3.46l-1.28.74-1.28.74c-1.65.95-3 .17-3-1.73V12Z'
      />
    </g>
  </svg>
)
export default VideoIcon
