'use client'
import ButtonGoogle from '@/components/ButtonGoogle'
import InputForm from '@/components/InputForm'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/static'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

const { EMAIL, PASSWORD } = InputRegister

function page() {
	const router = useRouter()
	const { loginUser, signInWithGoogle } = useAuth()

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		const target = event.target as HTMLFormElement
		const email = target[EMAIL].value
		const password = target[PASSWORD].value

		await loginUser({ email, password })
		router.refresh()
	}

	const handleClickGoogle = async () => {
		await signInWithGoogle()
	}

	return (
		<>
			<div className='sm:w-[25rem] w-full bg-black rounded-2xl sm:px-14 py-16 px-[10%] box-content'>
				<form className='w-full h-full grid gap-5' onSubmit={handleSubmit}>
					<div className='flex justify-center'>
						<h2 className='text-3xl'>Login</h2>
					</div>

					<div className='flex flex-col h-full w-full gap-5'>
						<div>
							<InputForm id={EMAIL} type='email' placeholder='Email' required={true} />
						</div>
						<div>
							<InputForm
								id={PASSWORD}
								type='password'
								placeholder='Password'
								required={true}
							/>
						</div>
						<div className='flex justify-center gap-4'>
							<ButtonGoogle onClick={handleClickGoogle} />
						</div>
					</div>

					<div className='flex flex-col gap-3'>
						<div className='flex justify-end'>
							<Link href='/auth/reset-password'>Forgot password</Link>
						</div>
						<button type='submit' className='bg-tertiary w-full py-3 rounded-lg'>
							Login
						</button>
						<p className='text-center'>
							Dont have an account? <Link href='/auth/register'>Register</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	)
}

export default page
