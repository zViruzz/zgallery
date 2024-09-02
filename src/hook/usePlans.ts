/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MercadoPagoConfig, PreApprovalPlan } from 'mercadopago'

import { createBrowserClient } from '@supabase/ssr'

export default function usePlans () {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!
  })

  const payment = new PreApprovalPlan(client)

  const changePlanBasic = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { user_plan: 'BASIC' }
      })

      if (error != null) console.error('A ocurido un error al cambiar de plan', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  const changePlanPremiun = async () => {
    console.log('change plan')
    try {
      const body = {
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          repetitions: 12,
          billing_day: 10,
          billing_day_proportional: false,
          free_trial: {
            frequency: 1,
            frequency_type: 'months'
          },
          transaction_amount: 10,
          currency_id: 'ARS'
        },
        back_url: 'https://www.yoursite.com',
        payment_methods_allowed: {
          payment_types: [
            {
              id: 'credit_card'
            }
          ],
          payment_methods: [
            {
              id: 'bolbradesco'
            }
          ]
        },
        reason: 'Yoga classes'
      }

      payment.create({ body })
        .then(console.log)
        .catch(console.log)

      // const { data, error } = await supabase.auth.updateUser({
      //   data: { user_plan: 'PREMIUN' }
      // })

      // if (error != null) console.error('A ocurido un error al cambiar de plan', error)
      // return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  return { changePlanBasic, changePlanPremiun }
}
