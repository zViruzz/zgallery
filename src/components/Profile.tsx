import Link from 'next/link'
import { type User } from '@supabase/supabase-js'
import Image from 'next/image'
interface Props {
  user: User
}

function Profile ({ user }: Props) {
  return (
    <div className='flex justify-between'>
      {(user != null) && (
        <div className='flex text-sm items-center'>
          <Image
            src={user.user_metadata.avatar_url}
            width={35}
            height={35}
            alt='user image'
            />
          {user.user_metadata.full_name}

        </div>
      )}

      <Link href='/app/setting'>
        ==
      </Link>
    </div>
  )
}

export default Profile
