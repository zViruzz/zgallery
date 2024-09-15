'use server'

import authUser from '@/util/auth-user'
import MercadoPagoConfig, { PreApprovalPlan } from 'mercadopago'
import { redirect } from 'next/navigation'

const saveSubscriptionPreapprovalId = async (id: string) => {
  try {
    const { supabase } = await authUser()
    const { data, error } = await supabase.auth.updateUser({
      data: {
        subscription_preapproval_id: id
      }
    })

    if (error != null) console.error('A ocurido un error al cambiar de nombre', error)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function premiunPlan (price: number) {
  if (process.env.MP_ACCESS_TOKEN === undefined) {
    throw new Error('MP_ACCESS_TOKEN is not defined')
  }
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const payment = new PreApprovalPlan(client)
  const body = {
    reason: 'zGallery-test-sub',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      repetitions: 12,
      billing_day: 10,
      transaction_amount: Number(price),
      currency_id: 'ARS'
    },
    back_url: 'https://www.mercadopago.com.ar'
  }

  const result = await payment.create({ body })
  if (result.id === undefined) {
    throw new Error('id is not defined')
  }

  await saveSubscriptionPreapprovalId(result.id)

  if (result.init_point === undefined) {
    throw new Error('init_point is not defined')
  }
  redirect(result.init_point)
}
