import MercadoPagoConfig, { Payment } from 'mercadopago'
import { type NextRequest } from 'next/server'

export async function POST (request: NextRequest) {
  if (process.env.MP_ACCESS_TOKEN === undefined) {
    throw new Error('MP_ACCESS_TOKEN is not defined')
  }
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const id = await request.json()
    .then((data) => data.data.id as string)

  // const payment = await new PreApprovalPlan(client).get({ preApprovalPlanId: id })
  const payment = await new Payment(client).get({ id })
  console.log('🚀 ~ POST ~ payment:', payment)

  return Response.json({ success: true, status: 200 })
}
