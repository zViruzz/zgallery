'use client'
import Input from '@/components/Input'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/registerStatic'
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'

const { EMAIL, PASSWORD } = InputRegister

function page () {
  const router = useRouter()
  const { loginUser } = useAuth()
  // console.log('🚀 ~ file: page.tsx:13 ~ page ~ user:', user)

  // if (user !== undefined) {
  //   return (
  //     <div>lol ya estas logeado</div>
  //   )
  // }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const email = target[EMAIL].value
    const password = target[PASSWORD].value

    const { data, error } = await loginUser({ email, password })
    console.log('🚀 ~ file: page.tsx:22 ~ handleSubmit ~ error:', error)
    console.log('🚀 ~ file: page.tsx:22 ~ handleSubmit ~ data:', data)
    router.push('/app')
  }

  return (
      <div className='w-[25rem] h-[20rem] bg-black rounded-2xl p-14 py-16 box-content'>
        <form
          className='w-full h-full grid grid-rows-[1fr_2.5fr_1fr]'
          onSubmit={handleSubmit}
          >

          <div className='flex justify-center '>
            <h2 className='text-3xl'>Login</h2>
          </div>

          <div className='grid grid-rows-2 h-full w-full items-center '>
            <div>
              <Input
                id={EMAIL}
                type='email'
                placeholder='Email'
                required={true}
              />
            </div>
            <div >
              <Input
                id={PASSWORD}
                type='password'
                placeholder='Password'
                required={true}
              />
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex justify-end'>
              <a href='#'>Forgot password</a>
            </div>
            <button
              type='submit'
              className='bg-tertiary w-full py-3 rounded-lg'
            >
              Login
            </button>
            <p className='text-center'>Dont have an account? <a href="#">Register</a></p>
          </div>

        </form>
      </div>
  )
}

export default page
