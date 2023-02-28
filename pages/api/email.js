export default async function handler(req, res) {
  let data = ''
  try {
    data = await fetch(
      `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${process.env.WECHAT_WORK_CORPID}&corpsecret=${process.env.WECHAT_WORK_SHORT_CROPSCRET}`
    )
      .then(res => res.json())
      .then(res => res)
    const token = data.access_token
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      to: {
        emails: ['quany@l0l.ink', 'quany@live.com'],
        userids: []
      },
      cc: {
        emails: ['li_ds@suixingpay.com'],
        userids: []
      },
      bcc: {
        emails: ['913507513@qq.com'],
        userids: []
      },
      subject: '测试邮件',
      content: '这是邮件正文\n谢谢！',
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

    return res.status(200).json({
      data
    })
  } catch (error) {
    return res.status(500).json({ error, data })
  }
}
