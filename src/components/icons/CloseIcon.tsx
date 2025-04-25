import * as React from 'react'
import type { SVGProps } from 'react'

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d='m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6'
    />
  </svg>
)
export default CloseIcon
