'use client'
import Input from '@/components/Input'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/registerStatic'
import { type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import ButtonGoogle from '@/components/ButtonGoogle'

const { USERNAME, EMAIL, PASSWORD, REPASSWORD } = InputRegister

function page () {
  const { registerUser, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const email = target[EMAIL].value
    const password = target[PASSWORD].value

    const { data } = await registerUser({ email, password })
    console.log('🚀 ~ file: page.tsx:25 ~ handleSubmit ~ data:', data)
    router.push('/auth/verification/provider')
    router.refresh()
  }

  const handleClickGoogle = async () => {
    await signInWithGoogle()
  }

  return (
      <div className='w-[25rem] bg-black rounded-2xl p-14 py-16 box-content'>
        <form
          className='w-full h-full grid gap-5'
          onSubmit={handleSubmit}
        >

          <div className='flex justify-center '>
            <h2 className='text-3xl'>Register</h2>
          </div>

          <div className=' flex flex-col h-full w-full gap-5'>
            <div>
              <Input
                id={USERNAME}
                type='text'
                placeholder='Username'
              />
            </div>
            <div>
              <Input
                id={EMAIL}
                type='email'
                placeholder='Email'
                required={true}
              />
            </div>
            <div>
              <Input
                id={PASSWORD}
                type='password'
                placeholder='Password'
                required={true}
              />
            </div>
            <div>
              <Input
                id={REPASSWORD}
                type='password'
                placeholder='Password'
                required={true}
              />
            </div>

          <div className='flex justify-center gap-4'>
            <ButtonGoogle onClick={handleClickGoogle} />
            <ButtonGoogle onClick={handleClickGoogle} />
          </div>

            <div className='flex flex-col gap-3'>
              <button
                type='submit'
                className='bg-tertiary w-full py-3 rounded-lg'
              >
                Register
              </button>
            </div>

          </div>
          <div>
            <p className='text-center'>Do you already have an account? <a href="#">Login</a></p>
          </div>

        </form>
      </div>
  )
}

export default page
