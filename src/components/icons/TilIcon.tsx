import * as React from 'react'
import type { SVGProps } from 'react'
const TilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    width='1em'
    height='1em'
    aria-hidden='true'
    {...props}
  >
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 12.611 8.923 17.5 20 6.5'
    />
  </svg>
)
export default TilIcon
