const codeTable = (res) => {
  switch (res.code) {
    case 200001:
      return {
        icon: 'activate-email-send-popup',
        message: 'Please check your email for register'
      }
    case 401001:
      return {
        icon: 'sign-in-error-popup',
        message: 'Email or password is not valid'
      }
    case 403002:
      return {
        icon: 'repeated-register-popup',
        message: 'This email has been already registered'
      }
    default:
      return {
        icon: 'network-error-popup',
        message: res.message
      }
  }
}

export default codeTable
