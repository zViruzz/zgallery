import type { SVGProps } from 'react'

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15.7 4C18.87 4 21 6.98 21 9.76 21 15.39 12.16 20 12 20c-.16 0-9-4.61-9-10.24C3 6.98 5.13 4 8.3 4c1.82 0 3.01.91 3.7 1.71.69-.8 1.88-1.71 3.7-1.71Z'
    />
  </svg>
)
export default HeartIcon
