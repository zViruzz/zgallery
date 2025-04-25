import type { SVGProps } from 'react'

const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    aria-hidden='true'
    {...props}
  >
    <title />
    <g
      fill='none'
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.3}
      data-name='add'
    >
      <path d='M12 19V5M5 12h14' />
    </g>
  </svg>
)
export default AddIcon
