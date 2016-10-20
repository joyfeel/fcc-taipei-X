import Boom from 'boom'
import nodemailer from 'nodemailer'
import { getCleanUser } from '../utils/mixed'
import Config from '../config'

export async function checkEmailStatus(ctx, next) {
  const nodemailerInfo = ctx.state.nodemailerInfo,
        user = getCleanUser(ctx.state.user)

  if (nodemailerInfo.rejected.length === 0) {
    ctx.response.body = {
      status: 'success',
      code: 200001,
      message: 'You can go to check your email'
    }
  } else {
    throw Boom.create(500, 'Your data is bad and you should feel bad', { code: 500002 })
  }
}

export function mailTransport(userInfo, routePath, option, emailToken = undefined) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(Config.gmailConfig)
    let message
    if (emailToken) {
      message = {
        ...Config.registerMailTemplate,
        from: Config.gmailSender,
        to: userInfo.email,
        html:
          `<h1>Hi ${userInfo.nickname}</h1>
           <h2>
             <a href='http://localhost:3000/${routePath}?token=${emailToken}'>
               Click here to ${option} your account
             </a>
           </h2>`
          //html: `<h1>Hi ${userInfo.nickname}</h1> ${Config.registerMailTemplate.html}`
      }
    } else {
      message = {
        ...Config.registerMailTemplate,
        to: userInfo.email,
        html:
          `<h1>Hi ${userInfo.nickname}</h1>
           <h2>
             Profile setting has been modified
           </h2>`
      }
    }

    transporter.verify((err, success) => {
      if (err) {
        const SMTPError = Boom.create(500, 'SMTP server unavailable to verify', { code: 503001 })
        return reject(SMTPError)
     } else {
       transporter.sendMail(message, (err, info) => {
         if (err) {
           const SMTPError = Boom.create(500, 'SMTP server unavailable to send', { code: 503002 })
           return reject(SMTPError)
         }
         resolve(info)
       })
     }
   })
  })
}
