// import MercadoPagoConfig from 'mercadopago'
import { type NextRequest } from 'next/server'

export async function POST (request: NextRequest) {
  if (process.env.MP_ACCESS_TOKEN === undefined) {
    throw new Error('MP_ACCESS_TOKEN is not defined')
  }
  // const client = new MercadoPagoConfig({
  //   accessToken: process.env.MP_ACCESS_TOKEN
  // })

  const body = await request.json()

  console.log('🚀 ~ POST ~ body:', body)
  // const payment = await new PreApprovalPlan(client).get({ preApprovalPlanId: 'asdasdasd22' })
  // console.log('🚀 ~ POST ~ payment:', payment)

  return Response.json({ success: true, status: 200 })
}
