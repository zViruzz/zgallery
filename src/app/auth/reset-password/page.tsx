'use client'
import InputForm from '@/components/InputForm'
import NotificationLayout from '@/components/NotificationLayout'
import { useNotificationContext } from '@/context/notification'
import useAuth from '@/hook/useAuth'
import { InputRegister } from '@/static/static'
import type { FormEvent } from 'react'

const { EMAIL } = InputRegister
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

function page() {
	const { supabase } = useAuth()
	const { handleNotification } = useNotificationContext()

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if (DOMAIN_URL === undefined) console.error('DOMAIN_URL  is undefined')

		const target = event.target as HTMLFormElement
		const email = target[EMAIL].value

		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${DOMAIN_URL}/auth/reset-password/change`,
		})

		if (error) {
			handleNotification({
				message: error.message,
				type: 'ERROR',
			})
			return
		}

		if (data === null) {
			handleNotification({
				message: 'Error sending email',
				type: 'ERROR',
			})
			return
		}

		handleNotification({
			message: 'Check your email for the reset password link.',
			type: 'DONE',
		})
	}

	return (
		<form
			className='bg-black flex flex-col p-10 gap-5 rounded-2xl'
			onSubmit={handleSubmit}
		>
			<NotificationLayout />
			<div className='text-xl'>
				<p>Enter your email to reset your password.</p>
			</div>
			<div className=''>
				<InputForm id='email' type='email' placeholder='Email' required={true} />
			</div>
			<button type='submit' className='bg-tertiary w-full py-3 rounded-lg'>
				Send
			</button>
		</form>
	)
}

export default page
