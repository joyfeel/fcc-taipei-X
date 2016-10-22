const codeTable = (code) => {
    switch (code) {
        case 200001:
          return {
            icon: 'activate-email-send-popup',
            message: 'Please check your email for register'
          }
        case 403002:
          return {
            icon: 'repeated-register-popup',
            message: 'This email has been already registered'
          }
        default:
          return null
    }
}

export default codeTable
