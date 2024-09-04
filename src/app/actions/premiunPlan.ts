'use server'

import MercadoPagoConfig, { PreApprovalPlan } from 'mercadopago'
import { redirect } from 'next/navigation'

export async function premiunPlan (price: number) {
  if (process.env.MP_ACCESS_TOKEN === undefined) {
    throw new Error('MP_ACCESS_TOKEN is not defined')
  }
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const payment = new PreApprovalPlan(client)

  const body = {
    reason: 'zGallery-test',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      repetitions: 12,
      billing_day: 10,
      transaction_amount: price,
      currency_id: 'ARS'
    },
    back_url: 'https://www.mercadopago.com.ar'
  }

  const result = await payment.create({ body })
  if (result.init_point === undefined) {
    throw new Error('init_point is not defined')
  }
  redirect(result.init_point)
}
