import { createServerClient } from '@supabase/ssr'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { cookies } from 'next/headers'

async function authUser() {
	const cookieStore = cookies()

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL ||
			(() => {
				throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
			})(),
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
			(() => {
				throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
			})(),
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value
				},
			},
		},
	)

	return { supabase }
}

export default authUser
