import React, { Component } from 'react'
import UploadAvatar from './UploadAvatar'
import HintChecked from '../Shared/HintChecked'
import SignFormNickname from '../Shared/SignFormNickname'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'


const info = {
  nicknameMsg: 'At least 3 letters without special characters.',
  emailMsg: 'e.g. hello.world@meet.io',
  passwordMsg: 'At least 4 to 12 letters with 0-9 and English characters.',
  nicknamePattern: /^[A-Za-z0-9\u4e00-\u9fa5\.'\- ]{3,20}$/g,
  emailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
  passwordPattern: /^(?!.*[',.~!@#$%^&*`()_\-+=|\\{}[\]:;<>?/])(?!.*[^\x00-\xff])(?=.*\d)(?=.*[A-Za-z])\S{4,12}$/g,
  nicknameMinCount: 2
}


class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: false,
      email: false,
      password : false,

      valid: {
        nickname: false,
        email: false,
        password : false
      },

      count: {
        nickname: 0,
        email: null,
        password : 0
      },

      msg: {
        nickname: '',
        email: '',
        password : ''
      }
    }

    this.focus = this.focus.bind(this)
    this.blur =this.blur.bind(this)
    this.change = this.change.bind(this)

  /*因為沒有在renderDOM李所以不需要bind(this)
    this.msgState = this.focusState.bind(this)
    this.validState = this.changeState.bind(this) */
  }


  msgState(targetId) {
    const { valid, msg } = this.state
    const infoMsg = info[`${targetId}Msg`] //找到info對應this.state.msg的字串
    this.setState({
      msg: {...msg, [targetId]: valid[targetId] ? msg[targetId] = '' : msg[targetId] = infoMsg}
    }) // valid[targetId]  看 valid 驗證 true || false 決定 msg 提示字串
  }

  validState(flag, targetId) {
    const { valid } = this.state
    this.setState({
      valid: {...valid, [targetId]: flag ? valid[targetId] = true : valid[targetId] = false}
    })
    //如valid state驗證改變 msg提示字串就需要改變
    this.msgState(targetId)
  }


  focus(e) {
    //把HintChecked component 打開
    this.setState({[e.target.id]: true})

    //引入msgState 引入提示字串
    this.msgState(e.target.id)
  }

  blur(e) {
    const { nickname, email, password } = this.state
  }

  change(e) {
    const txt = e.target.value
    const len = txt.length
    const val = txt.trim()
    const { count } = this.state

    //判斷是否合regxp
    const patternTest = txt.match(info[`${e.target.id}Pattern`]) //找到info對應valid的判別式
    const flag = !!patternTest  // 判斷是否合regxp 如果是null轉 false


    //計算nickname和password inputs裡value的長度(含空白鍵)
    this.setState({
      count: {...count, [e.target.id]: e.target.id !== 'email' ? len : null}
    })

    switch (e.target.id) {
      case 'nickname':
        // length also should be greater than 2 after trim()
        if(val.length > info.nicknameMinCount) {
          this.validState(flag, e.target.id)
        } else {
          //字串長度不足最低長度(nicknameMinCount)時，給驗證valid state false
          this.validState(false, e.target.id)
        }
      break
      case 'email':
      case 'password':
        this.validState(flag, e.target.id)
      break
    }
  }

  render() {
    const { nickname, email, password, valid, count, msg } = this.state

    return (
      <form className='sign-up-form'>
        <UploadAvatar />
        <SignFormNickname
          focus={this.focus}
          blur={this.blur}
          change={this.change}
        />
        <HintChecked
          nickname={nickname}
          valid={valid.nickname}
          count={count.nickname}
          msg={msg.nickname}
        />
        <SignFormEmail
          focus={this.focus}
          blur={this.blur}
          change={this.change}
        />
        <HintChecked
          email={email}
          valid={valid.email}
          count={count.email}
          msg={msg.email}
        />
        <SignFormPassword
          focus={this.focus}
          blur={this.blur}
          change={this.change}
        />
        <HintChecked
          password={password}
          valid={valid.password}
          count={count.password}
          msg={msg.password}
        />
        <SubmitBtn txt={'SIGN UP'} />
        <p className='signup note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>
      </form>
  )}
}

export default SignUpForm
