import MercadoPagoConfig, { PreApproval } from "mercadopago";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (process.env.MP_ACCESS_TOKEN === undefined) {
    throw new Error("MP_ACCESS_TOKEN is not defined");
  }
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const res = await request.json()
  const id = res.data.id as string
  console.log("🚀 ~ POST ~ res:", res);
  console.log("🚀 ~ POST ~ ID:", id);

  const payment = await new PreApproval(client).get({ id: id })
    .then(res => res)
    .catch(res => console.error(res))

  console.log("🚀 ~ POST ~ resPayment:", payment);

  return Response.json({ success: true, status: 200 });
}
