import type { SVGProps } from 'react'

const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
    {...props}
  >
    <g stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
      <path d='M12.5 4v13m0 0L7 12.21M12.5 17l5.5-4.79M6 21h13' />
    </g>
  </svg>
)
export default DownloadIcon
