import authUser from './auth-user'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function savePaymentData(payment: any) {
	try {
		const { supabase } = await authUser()
		const { data, error } = await supabase.auth.updateUser({
			data: { payment },
		})

		if (error != null)
			console.error('A ocurido un error al guardar los datos del pago', error)
		return { data, error }
	} catch (error) {
		console.log(error)
	}
}
