import type { SVGProps } from 'react'

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
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
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={3}
    >
      <path d='M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4' />
      <path d='M12.5 15.8 22 6.2 17.8 2l-9.5 9.5L8 16l4.5-.2z' />
    </g>
  </svg>
)
export default EditIcon
