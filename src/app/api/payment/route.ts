import MercadoPagoConfig, { PreApprovalPlan } from 'mercadopago'
import { type NextRequest } from 'next/server'

export async function POST (request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const body = await request.json()
  console.log('🚀 ~ POST ~ body:', body)
  const payment = await new PreApprovalPlan(client).get({ id: body.data.id })
  console.log('🚀 ~ POST ~ payment:', payment)

  return Response.json({ success: true, status: 200 })
}
