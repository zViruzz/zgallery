import authUser from './auth-user'

export default async function savePaymentData (payment: any) {
  try {
    const { supabase } = await authUser()
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert([
        {
          id: payment.id,
          preapproval_plan_id: payment.preapproval_plan_id,
          status: payment.status,
          reason: payment.reason,
          date_created: payment.date_created,
          last_modified: payment.last_modified,
          all_data: payment
        }
      ])
      .select()

    if (error !== null) console.error('A ocurido un error al cambiar de nombre', error)
    return data
  } catch (error) {
    console.log(error)
  }
}
