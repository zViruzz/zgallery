import type { SVGProps } from 'react'

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
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
      <path d='M13 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM13 12a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM13 19a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z' />
    </g>
  </svg>
)
export default MenuIcon
