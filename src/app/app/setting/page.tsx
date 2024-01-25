'use client'
import useAuth from '@/hook/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function page () {
  const { user, signOut, deleteUser } = useAuth()
  const router = useRouter()

  const handleClickDeleteUser = () => {
    deleteUser()
  }

  const handleClickSignOut = () => {
    signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full mx-auto max-w-screen-md md:px-6 px-4 flex flex-col justify-center'>
        <div className='bg-zinc-800 px-6 py-3 rounded-xl divide-zinc-700 divide-y [&>div]:py-5 [&>div]:flex [&>div]:justify-between'>

          <div className='items-center'>
            <div>
              {
                user === null
                  ? null
                  : <Image
                    className='rounded-full'
                    src={user?.user_metadata.avatar_url}
                    alt="avatar"
                    width={100}
                    height={100}
                  />
              }
            </div>
            <div>
              Avatar
            </div>
          </div>

          <div>
            <div>
              {user?.email}
            </div>
            <div>
              Email
            </div>
          </div>

          <div>
            <div>
              {user?.user_metadata.name}
            </div>
            <div>
              Name
            </div>
          </div>

          <div>
            <div>
              *********
            </div>
            <div>
              Password
            </div>
          </div>

          <div className='[&>button]:px-3 [&>button]:py-2 [&>button]:rounded-lg [&>button]:bg-primary'>
            <button onClick={handleClickDeleteUser}>
              Delete user
            </button>
            <button onClick={handleClickSignOut}>
              Sign out
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default page
