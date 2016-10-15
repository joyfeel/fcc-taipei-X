export default {
  gmailSender: process.env.GMAIL_USERNAME,
  gmailConfig: {
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    },
    logger: true,
    debug: true
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
