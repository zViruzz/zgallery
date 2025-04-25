import { useNotificationContext } from '@/context/notification'
import type { registerUserType } from '@/type'
import { createBrowserClient } from '@supabase/ssr'
import type { User, UserResponse } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

interface signinUserType {
	email: string
	password: string
}

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

function useAuth() {
	if (DOMAIN_URL === undefined) console.error('DOMAIN_URL  is undefined')
	const { notification, handleNotification } = useNotificationContext()

	const [user, setUser] = useState<User | null>(null)
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL ||
			(() => {
				throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
			})(),
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
			(() => {
				throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
			})(),
	)

	const getUser = async (): Promise<UserResponse> => {
		return await supabase.auth.getUser()
	}

	const signInWithGoogle = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${DOMAIN_URL}/auth/verification/provider`,
				},
			})

			if (error != null) console.error('A ocurido un error al autenticar', error)
			return { data, error }
		} catch (error) {
			console.log(error)
		}
	}

	const registerUser = async ({ email, password, name }: registerUserType) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						name,
						full_name: name,
						user_plan: 'BASIC',
					},
				},
			})

			console.log('🚀 ~ loginUser ~ error:', error?.message)

			if (error?.message === 'Email rate limit exceeded') {
				handleNotification({
					message: 'Email rate limit exceeded',
					type: 'ERROR',
				})
			}
			if (error?.message === 'Invalid login credentials') {
				handleNotification({
					message: 'Your password or email address is invalid',
					type: 'ERROR',
				})
			}

			if (error != null) console.error('A ocurido un error al autenticar', error)
			return { data, error }
		} catch (error) {
			console.log(error)
		}
	}

	const loginUser = async ({ email, password }: signinUserType) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error?.message === 'Email not confirmed') {
				handleNotification({
					message: 'Email not confirmed',
					type: 'ERROR',
				})
			}
			if (error?.message === 'Invalid login credentials') {
				handleNotification({
					message: 'Your password or email address is invalid',
					type: 'ERROR',
				})
			}

			if (error != null) console.error('A ocurido un error al autenticar', error)
			return { data, error }
		} catch (error) {
			console.log(error)
		}
	}

	const signOut = async () => {
		try {
			await supabase.auth.signOut()
		} catch (error) {
			console.log(error)
		}
	}

	const changePassword = async () => {
		try {
			const email = user?.email
			if (email === undefined) {
				console.log('email undefined')
				return
			}
			const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${DOMAIN_URL}/app/setting/change/password`,
			})

			if (error != null) console.error('A ocurido un error al cambiar de password', error)
			return { data, error }
		} catch (error) {
			console.log(error)
		}
	}

	const changeName = async (name: string) => {
		try {
			const { data, error } = await supabase.auth.updateUser({
				data: { name },
			})

			if (error != null) console.error('A ocurido un error al cambiar de nombre', error)
			return { data, error }
		} catch (error) {
			console.log(error)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getUser().then((res) => {
			setUser(res.data.user)
		})
	}, [])

	return {
		supabase,
		registerUser,
		notification,
		loginUser,
		signOut,
		signInWithGoogle,
		changePassword,
		changeName,
		getUser,
		user,
	}
}

export default useAuth
