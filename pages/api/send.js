// import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req) {
  let data = ''
  let error = ''
  try {
    data = await fetch(
      `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${process.env.WECHAT_WORK_CORPID}&corpsecret=${process.env.WECHAT_WORK_SHORT_CROPSCRET}`
    )
      .then(res => res.json())
      .then(res => res)
    console.log(data)
    const token = data.access_token
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      to: {
        emails: ['quany@l0l.ink'],
        userids: []
      },
      cc: {
        emails: [],
        userids: []
      },
      bcc: {
        emails: [],
        userids: []
      },
      subject: '这是标题',
      content: '这是邮件正文',
      attachment_list: []
    })

    data = await fetch(
      `https://qyapi.weixin.qq.com/cgi-bin/exmail/app/compose_send?access_token=${token}`,
      {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
    )
      .then(res => res.json())
      .then(res => res)
  } catch (err) {
    error = err
  }

  return NextResponse.json({
    uuid: crypto.randomUUID(),
    ip: req.ip,
    url: req.nextUrl,
    data,
    error
  })
}
