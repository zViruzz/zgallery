'use client'
import InputForm from '@/components/InputForm'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/static'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

function page() {
  const { USERNAME } = InputRegister
  const { changeName } = useAuth()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const name = target[USERNAME].value as string

    await changeName(name)
    router.push('/app/setting')
    router.refresh()
  }

  return (
    <>
      <h1 className='text-2xl my-3'>Rename</h1>

      <form className='py-4' onSubmit={handleSubmit}>
        <div className=' flex flex-col h-full w-full gap-4'>
          <div>
            <InputForm id={USERNAME} type='text' placeholder='New name' />
          </div>

          <div className='flex flex-col gap-3'>
            <button type='submit' className='bg-tertiary w-full py-3 rounded-lg'>
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default page
