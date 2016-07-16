import Boom from 'boom'
import nodemailer from 'nodemailer'
import { getCleanUser } from '../utils'
import Config from '../config'

export async function checkEmailStatus(ctx, next) {
  const nodemailerInfo = ctx.state.nodemailerInfo,
        user = getCleanUser(ctx.state.user)

  if (nodemailerInfo.rejected.length === 0) {
    ctx.response.body = {
      results: 'Successlly',
      user,
      status: 'OK'
    }
  } else {
    throw Boom.badImplementation('Your data is bad and you should feel bad')
  }
}

export function mailTransport (userInfo, emailToken = undefined) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(Config.viaMailConfig)
    let message
    if (emailToken) {
      message = {
        ...Config.registerMailTemplate,
        from: Config.viaSender,
        to: userInfo.email,
        html:
          `<h1>Hi ${userInfo.nickname}</h1>
           <h2>
             <a href='http://localhost:3000/register/${emailToken}'>
               Click here to activate your account
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
        console.log('Verify SMTP configuration error')
        console.log(err)
        const SMTPError = Boom.serverUnavailable('SMTP server unavailable to verify')
        return reject(SMTPError)
     } else {
       transporter.sendMail(message, (err, info) => {
         if (err) {
           console.log('Send mail error')
           const SMTPError = Boom.serverUnavailable('SMTP server unavailable to send')
           return reject(SMTPError)
         }
         resolve(info)
       })
     }
   })
  })
}
