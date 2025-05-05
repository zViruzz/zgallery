'use client'
import InputForm from '@/components/InputForm'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/static'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

function page() {
	const { PASSWORD, REPASSWORD } = InputRegister
	const { supabase } = useAuth()
	const router = useRouter()

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		const target = event.target as HTMLFormElement
		const password = target[PASSWORD].value as string
		const confirmPassword = target[REPASSWORD].value as string

		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}

		await supabase.auth.updateUser({ password })

		router.push('/app/setting')
		router.refresh()
	}

	return (
		<>
			<form
				className='bg-black flex flex-col p-10 gap-5 rounded-2xl '
				onSubmit={handleSubmit}
			>
				<h1 className='text-2xl'>Change password</h1>
				<div>
					<InputForm id={PASSWORD} type='password' placeholder='New password' />
				</div>
				<div>
					<InputForm id={REPASSWORD} type='password' placeholder='Repeat new password' />
				</div>
				<div className='flex flex-col gap-3'>
					<button type='submit' className='bg-tertiary w-full py-3 rounded-lg'>
						Change
					</button>
				</div>
			</form>
		</>
	)
}

export default page
