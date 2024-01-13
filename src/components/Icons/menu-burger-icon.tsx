import { type SVGProps } from 'react'

const MenuBurgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.3}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
)
export default MenuBurgerIcon
