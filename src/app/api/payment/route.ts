import MercadoPagoConfig, { PreApproval } from 'mercadopago'
import { type NextRequest } from 'next/server'

export async function POST (request: NextRequest) {
  if (process.env.MP_ACCESS_TOKEN === undefined) {
    throw new Error('MP_ACCESS_TOKEN is not defined')
  }
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const res = await request.json()
  const id = res.data.id as string

  const payment = await new PreApproval(client).get({ id })
    .then(res => res)
    .catch(res => { console.error(res) })

  console.log('🚀 ~ POST ~ payment:', payment)
  return Response.json({ success: true, status: 200 })
}

// 🚀 ~POST ~res: {
//   action: 'created',
//     application_id: 8702795964571019,
//       data: { id: '2c93808491b45c3b0191bdfea614038d' },
//   date: '2024-09-04T17:04:28Z',
//     entity: 'preapproval_plan',
//       id: 115610937369,
//         type: 'subscription_preapproval_plan',
//           version: 0
// }
