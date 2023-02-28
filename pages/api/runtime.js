// import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req) {
  // todo: req.bodyUsed true ->
  // const test = await (await req.formData()).get('test'); // x-www-form-urlencode, form-data
  // const test = await req.json(); // raw
  // const test = await req.text();
  // console.log("body:", test);

  const ob = new URLSearchParams(req.nextUrl.searchParams)

  return NextResponse.json({
    uuid: crypto.randomUUID(),
    ip: req.ip,
    url: req.nextUrl,
    oc: ob.toString()
  })
}
