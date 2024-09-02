'use server'

import MercadoPagoConfig, { PreApprovalPlan } from 'mercadopago'
import { redirect } from 'next/navigation'

export async function premiunPlan (price: number) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const payment = new PreApprovalPlan(client)

  const body = {
    reason: 'zGallery',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      repetitions: 12,
      billing_day: 10,
      transaction_amount: 1000,
      currency_id: 'ARS'
    },
    back_url: 'https://www.mercadopago.com.ar'
  }

  const result = await payment.create({ body })
  console.log('🚀 ~ donate ~ result:', result)
  redirect(result.init_point)
}
