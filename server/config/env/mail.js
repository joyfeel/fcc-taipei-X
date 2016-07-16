export default {
  gmailSender: 'joybee210@gmail.com',
  gMailConfig: {
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    },
    logger: true,
    debug: true
  },
  viaSender: 'joychen@via.com.tw',
  viaMailConfig: {
    host: 'email.via.com.tw',
    port: 587,
    auth: {
      user: process.env.VIA_USERNAME,
      pass: process.env.VIA_PASSWORD
    },
    logger: true
  },
  registerMailTemplate: {
    //X-Google-Original-From
    //from: 'joybee210@gmail.com',
    //to: 'joychen@via.com.tw',
    subject: 'Hello subject',
    text: 'Click here to activate your account: http://www.google.com.tw', // plaintext body
    html: '<h1><a href="www.google.com.tw">Click here to activate your account</a></h1>'
  }
}
