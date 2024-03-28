'use client'
import InputForm from '@/components/input-form'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/static'
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'

function page () {
  const { PASSWORD } = InputRegister
  const { supabase } = useAuth()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const password = target[PASSWORD].value as string

    await supabase.auth.updateUser({ password })

    router.push('/app/setting')
    router.refresh()
  }

  return (
    <>
      <h1 className='text-2xl my-3'>Change password</h1>

      <form
        className='py-4'
        onSubmit={handleSubmit}
      >
        <div className=' flex flex-col h-full w-full gap-4'>

          <div>
            <InputForm
              id={PASSWORD}
              type='password'
              placeholder='New password'
            />
          </div>

          <div className='flex flex-col gap-3'>
            <button
              type='submit'
              className='bg-tertiary w-full py-3 rounded-lg'
            >
              Save
            </button>
          </div>
        </div>

      </form>
    </>
  )
}

export default page
