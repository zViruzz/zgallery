import profileNull from '@/assets/profile-null.jpg'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import SettingIcon from './icons/SettingIcon'

interface Props {
  user: User
}

function Profile({ user }: Props) {
  return (
    <div className='flex justify-between items-center'>
      {user != null && (
        <div className='flex text-sm items-center gap-3'>
          <Image
            className='rounded-full'
            src={user.user_metadata.avatar_url ?? profileNull}
            width={35}
            height={35}
            alt='user image'
          />
          {user.user_metadata.name}
        </div>
      )}

      <Link href='/app/setting'>
        <SettingIcon className='text-[#797979]' width={24} height={24} />
      </Link>
    </div>
  )
}

export default Profile
