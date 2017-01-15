const env = process.env.NODE_ENV || 'development'
const temp = require(`./${env}`)

export const mailTransport = temp.mailTransport
export const checkEmailStatus = temp.checkEmailStatus
