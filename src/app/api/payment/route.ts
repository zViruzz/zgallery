import savePaymentData from '@/util/savePaymentData'
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
  console.log('🚀 ~ POST ~ res:', res)

  const payment = await new PreApproval(client).get({ id })
    .then(async res => {
      // Guarda los datos del pago en la base de datos
      await savePaymentData(res)
      return res
    })
    .catch(res => { console.error(res) })

  console.log('🚀 ~ POST ~ payment:', payment)
  return Response.json({ success: true, status: 200 })
}
