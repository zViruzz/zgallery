import type { SVGProps } from 'react'

const GalleryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
    {...props}
  >
    <g stroke='currentColor' strokeWidth={2}>
      <path d='M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z' />
      <circle cx={16} cy={8} r={2} />
      <path
        strokeLinecap='round'
        d='m2 10.154.98-.141C9.96 9.01 15.925 15.03 14.858 22'
      />
      <path
        strokeLinecap='round'
        d='m22 13.385-.973-.135c-2.844-.394-5.417 1.022-6.742 3.25'
      />
    </g>
  </svg>
)
export default GalleryIcon
