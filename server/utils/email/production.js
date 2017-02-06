import Boom from 'boom'
import Config from '../../config'

export async function checkEmailStatus(ctx, next) {
  const nodemailerInfo = ctx.state.nodemailerInfo
  if (nodemailerInfo.statusCode <= 202) {
    return ctx.response.body = {
      status: 'success',
      code: 200001,
      message: 'You can go to check your email',
    }
  }
  throw Boom.create(500, 'Your data is bad and you should feel bad', { code: 500002 })
}

export function mailTransport(userInfo, routePath, option, emailToken = undefined) {
  return new Promise((resolve, reject) => {
    const helper = require('sendgrid').mail
    const sg = require('sendgrid')(Config.mailServer.sendgrid.apiKey)
    const from_email = new helper.Email(Config.mailServer.sendgrid.sendgridSender)
    const to_email = new helper.Email(userInfo.email)
    const subject = Config.mailServer.mailTemplate.subject
    let content
    if (emailToken) {
      content = new helper.Content('text/html',
        `<h1>Hi, ${userInfo.nickname}</h1>
         <h3>Let's confirm your email address.</h3>
         <h3>
           <a href='${Config.hostUrl}/${routePath}?token=${emailToken}'>
             Click here to ${option} your account
           </a>
         </h3>`
      )
    } else {
      content = new helper.Content('text/html',
        `<h1>Hi, ${userInfo.nickname}</h1>
         <h3>
           Your profile setting has been changed
         </h3>`
      )
    }
    const mail = new helper.Mail(from_email, subject, to_email, content)
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    })
    sg.API(request, (err, response) => {
      if (err) {
        const SgError = Boom.create(500, 'Sendgrid server unavailable to request', { code: 503003 })
        return reject(SgError)
      }
      resolve(response)
    })
  })
}
