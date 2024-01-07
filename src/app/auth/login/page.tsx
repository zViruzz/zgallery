'use client'
import Input from '@/components/Input'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/registerStatic'
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'
import Link from 'next/link'
import ButtonGoogle from '@/components/ButtonGoogle'

const { EMAIL, PASSWORD } = InputRegister

function page () {
  const router = useRouter()
  const { loginUser, signInWithGoogle } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const email = target[EMAIL].value
    const password = target[PASSWORD].value

    await loginUser({ email, password })
    console.log('redireccion app')
    router.push('/app')
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

        <div className='flex justify-center'>
          <h2 className='text-3xl'>Login</h2>
        </div>

        <div className='flex flex-col h-full w-full gap-5'>
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
          <div className='flex justify-center gap-4'>
            <ButtonGoogle onClick={handleClickGoogle} />
            <ButtonGoogle onClick={handleClickGoogle} />
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
          <p className='text-center'>Dont have an account? <Link href='/auth/register'>Register</Link></p>
        </div>

      </form>
    </div>
  )
}

export default page
