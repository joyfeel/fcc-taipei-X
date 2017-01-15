import nodemailer from 'nodemailer'
import Boom from 'boom'
import Config from '../../config'

export async function checkEmailStatus(ctx, next) {
  const nodemailerInfo = ctx.state.nodemailerInfo
  if (nodemailerInfo.rejected.length === 0) {
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
    const transporter = nodemailer.createTransport(Config.gmail.gmailConfig)
    let message
    if (emailToken) {
      message = {
        title: Config.mailTemplate.subject,
        from: Config.gmail.gmailSender,
        to: userInfo.email,
        html:
          `<h1>Hi, ${userInfo.nickname}</h1>
           <h3>Let's confirm your email address.</h3>
           <h3>
             <a href='http://localhost:3000/${routePath}?token=${emailToken}'>
               Click here to ${option} your account
             </a>
           </h3>`
      }
    } else {
      message = {
        title: Config.mailTemplate.subject,
        from: Config.gmail.gmailSender,
        to: userInfo.email,
        html:
          `<h1>Hi, ${userInfo.nickname}</h1>
           <h3>
             Your profile setting has been changed
           </h3>`
      }
    }

    transporter.verify((err, success) => {
      if (err) {
        const SMTPError = Boom.create(500, 'SMTP server unavailable to verify', { code: 503001 })
        return reject(SMTPError)
      }
      transporter.sendMail(message, (err, info) => {
        if (err) {
          const SMTPError = Boom.create(500, 'SMTP server unavailable to send', { code: 503002 })
          return reject(SMTPError)
        }
        resolve(info)
      })
    })
  })
}
