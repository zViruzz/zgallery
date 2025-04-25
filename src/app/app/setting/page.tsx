'use client'
import profileNull from '@/assets/profile-null.jpg'
import EditIcon from '@/components/icons/EditIcon'
import useAuth from '@/hook/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function page() {
  const { user, signOut, changePassword } = useAuth()
  const [showNotification, setShowNotification] = useState(true)
  const router = useRouter()

  const handleClickChangePassword = async () => {
    changePassword()
    setShowNotification(false)
    setTimeout(() => {
      setShowNotification(true)
    }, 5000)
  }

  const handleClickChangeName = async () => {
    router.push('/app/setting/change/name')
  }

  const handleClickSignOut = () => {
    signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className='w-full h-full relative'>

      <div className={`bg-primary absolute bottom-0 right-0 m-3 p-5 rounded-lg ${showNotification ? 'hidden' : 'block'} `}>
        Check your email to change your password
      </div>

      <div className='w-full h-full mx-auto max-w-screen-md md:px-6 px-4 flex flex-col justify-center'>
        <div className='bg-[#1d1d1d] px-6 py-3 rounded-xl divide-zinc-700 divide-y [&>div]:py-6 [&>div]:flex [&>div]:justify-between'>

          <div className='items-center'>
            <div>
              {
                user === null
                  ? null
                  : <Image
                    className='rounded-full'
                    src={user.user_metadata.avatar_url ?? profileNull}
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
            <div className='flex gap-3'>
              <div>
                {user?.user_metadata.name}
              </div>
              <button
                type='button'
                className='flex items-center'
                onClick={handleClickChangeName}
              >
                <EditIcon className='text-zinc-500' width={15} height={15} />
              </button>
            </div>
            <div>
              Name
            </div>
          </div>

          <div>
            <div className='flex gap-3'>
              <div>
                *********
              </div>
              <button
                type='button'
                className='flex items-center'
                onClick={handleClickChangePassword}
              >
                <EditIcon className='text-zinc-500' width={15} height={15} />
              </button>
            </div>
            <div>
              Password
            </div>
          </div>

          <div className='[&>button]:px-3 [&>button]:py-2 [&>button]:rounded-lg [&>button]:bg-primary'>

            <button
              type='button'
              onClick={handleClickSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
