import profileNull from '@/assets/profile-null.jpg'
import Image from 'next/image'
import Link from 'next/link'
import HeartIcon from './icons/HeartIcon'
import SettingIcon from './icons/SettingIcon'

interface Props {
  avatar: string
  name: string
  handleClickLink: () => void
}

const MobileMenu = (props: Props) => {
  return (
    <nav className='bg-secodary w-full h-52 rounded-3xl'>
      <ul className='w-full h-full grid grid-rows-[1.2fr_1fr] grid-cols-2 [&>li]:flex [&>li]:justify-center [&>li]:flex-col [&>li]:items-center [&>li]:text-center [&>li>a]:flex [&>li>a]:justify-center [&>li>a]:flex-col [&>li>a]:items-center [&>li>a]:text-center'>
        <li className='col-span-2 grid gap-2'>
          <Image
            className='rounded-full'
            src={props.avatar ?? profileNull}
            width={37}
            height={37}
            alt='user image'
          />
          {props.name}
        </li>
        <li>
          <Link
            onClick={props.handleClickLink}
            href='/app/favorites'
          >
            <HeartIcon width={27} height={27} />
            Favorite
          </Link>
        </li>
        <li>
          <Link
            href='/app/setting'
            onClick={props.handleClickLink}
          >
            <SettingIcon width={27} height={27} />
            Setting
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default MobileMenu
