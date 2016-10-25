const codeTable = (res) => {
  switch (res.code) {
    case 100001:
      return {
        icon: 'email-input-popup',
        message: null,
        btnTxt: 'SEND'
      }
    case 200001:
      return {
        icon: 'activate-email-send-popup',
        message: 'Please check your email from @meet.',
        btnTxt: 'THANK YOU'
      }
    case 401001:
      return {
        icon: 'sign-in-error-popup',
        message: 'Email or password is not valid.',
        btnTxt: 'SORRY'
      }
    case 403002:
      return {
        icon: 'repeated-register-popup',
        message: 'This email has been already registered.',
        btnTxt: 'OOPS'
      }
    case 404002:
      return {
        icon: 'not-exist-popup',
        message: 'This email doesn\'t exist.',
        btnTxt: 'SORRY'
      }
    default:
      return {
        icon: 'network-error-popup',
        message: res.message,
        btnTxt: 'OK'
      }
  }
}

export default codeTable
