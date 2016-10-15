import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UploadAvatar from './UploadAvatar'
import HintChecked from '../Shared/HintChecked'
import SignFormNickname from '../Shared/SignFormNickname'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'
import * as AuthActions from '../../actions/auth'

const info = {
  nicknameMsg: 'At least 3 letters without special characters.',
  emailMsg: 'e.g. hello.world@meet.io',
  passwordMsg: 'At least 4 to 12 letters with 0-9 and English characters.',
  nicknamePattern: /^[A-Za-z0-9\u4e00-\u9fa5\.'\- ]{3,20}$/g,
  emailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
  passwordPattern: /^(?!.*[',.~!@#$%^&*`()_\-+=|\\{}[\]:;<>?/])(?!.*[^\x00-\xff])(?=.*\d)(?=.*[A-Za-z])\S{4,12}$/g,
  nicknameMinCount: 2,
  //defaultAvatar :'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWcluWxpF8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjE1MXB4IiBoZWlnaHQ9IjE1MXB4IiB2aWV3Qm94PSIwIDAgMTUxIDE1MSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUxIDE1MSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cmVjdCBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMTUxIiBoZWlnaHQ9IjE1MSIvPg0KPHBhdGggZmlsbD0iI0E5QTlBOSIgZD0iTTgzLjcxNSw5My4zNjhoNC4yM2MwLjg5My0xLjk3LDIuNTIxLTMuOTc4LDUuNzE3LTMuOTc4aDcuODM4Yy00LjUxNC0zLjIwMS0xMC41OS01Ljk2Ni0xNi4zMDMtNy44NTUNCgljLTAuNDk3LTAuMTY0LTMuNjYtMS41ODgtMS42ODQtNy41ODdoLTAuMDI3YzUuMTQ2LTUuMzAyLDkuMDgtMTMuODMxLDkuMDgtMjIuMjI2YzAtMTIuOTEyLTguNTg4LTE5LjY4MS0xOC41NjQtMTkuNjgxDQoJYy05Ljk4NSwwLTE4LjUyMyw2Ljc2NS0xOC41MjMsMTkuNjgxYzAsOC40MjgsMy45MDksMTYuOTk0LDkuMDksMjIuMjgxYzIuMDE3LDUuMjk0LTEuNTkzLDcuMjU3LTIuMzQ3LDcuNTMxDQoJYy0xMC40NSwzLjc4Mi0yMi43MTIsMTAuNjctMjIuNzEyLDE3LjQ3MmMwLDEuODMyLDAsMC43MjEsMCwyLjU0N2MwLDkuMjY0LDE3Ljk2MywxMS4zNjksMzQuNTg5LDExLjM2OQ0KCWMxLjI4LDAsMi41NjYtMC4wMTUsMy44NS0wLjA0MVY5OS4xMzNDNzcuOTQ5LDk1Ljk1NCw4MC41MzUsOTMuMzY4LDgzLjcxNSw5My4zNjh6Ii8+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjQTlBOUE5IiBkPSJNMTExLjU2Myw5Ny4xNDNoLTMuMzY5aC0zLjU5MmMtMC40OTYtMS45OS0wLjk5Ni0zLjk3OS0yLjk4Mi0zLjk3OWgtNy45NTQNCgkJYy0xLjk4OSwwLTIuNDg4LDEuOTktMi45ODMsMy45NzloLTYuOTY0Yy0xLjA5NCwwLTEuOTg3LDAuODk2LTEuOTg3LDEuOTg4djEzLjYyNXY0LjI3OWMwLDEuMDkyLDAuODk2LDEuOTg4LDEuOTg3LDEuOTg4aDI3Ljg1MQ0KCQljMS4wOTYsMCwxLjk5Mi0wLjg5NiwxLjk5Mi0xLjk4OFY5OS4xMzFDMTEzLjU1NSw5OC4wMzgsMTEyLjY1OCw5Ny4xNDMsMTExLjU2Myw5Ny4xNDN6IE05Ny42MzksMTE2LjkxDQoJCWMtMy40MjUsMC02LjM4Ni0xLjk1My03Ljg1MS00LjgwM2MtMC42MjEtMS4yMDctMC45NzgtMi41NzMtMC45NzgtNC4wMjVjMC00Ljg3NSwzLjk1MS04LjgyNyw4LjgyOC04LjgyNw0KCQljNC4zMjMsMCw3LjkxNiwzLjExMiw4LjY3NCw3LjIxOGMwLjA5OCwwLjUyMSwwLjE1MSwxLjA2MiwwLjE1MSwxLjYwOUMxMDYuNDY3LDExMi45NTcsMTAyLjUxNiwxMTYuOTEsOTcuNjM5LDExNi45MXoNCgkJIE0xMTEuNTY0LDEwMy4xMDloLTMuMjcxaC0wLjcxdi0xLjk5aDAuODk2aDMuMDg0djEuOTlIMTExLjU2NHoiLz4NCgk8cGF0aCBmaWxsPSIjQTlBOUE5IiBkPSJNOTcuNjM5LDEwMS42MTdjLTMuNTcyLDAtNi40NjQsMi44OTgtNi40NjUsNi40NjdjMCwxLjM2NywwLjQyOCwyLjYzNCwxLjE1LDMuNjc4DQoJCWMxLjE2NiwxLjY4OCwzLjEwOSwyLjc4OSw1LjMxNCwyLjc4OWMzLjU1MSwwLDYuNDMtMi44NjEsNi40NjMtNi40MDZjMC0wLjAyMSwwLjAwNC0wLjAzOSwwLjAwNC0wLjA2MQ0KCQlDMTA0LjEwNSwxMDQuNTE0LDEwMS4yMSwxMDEuNjE3LDk3LjYzOSwxMDEuNjE3eiIvPg0KPC9nPg0KPC9zdmc+DQo='
  defaultAvatar : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OS4zMyA1OC40MSI+PHRpdGxlPmRlZmF1bHQtdXBsb2FkLWF2YXRhcjE8L3RpdGxlPjxwYXRoIGQ9Ik04My4wOCw5NC40MmMtMC41NS0uMTktMy4xNC0xLjYyLTEuNy01LjQ0QTI0LjA4LDI0LjA4LDAsMCwwLDg3Ljk1LDcyLjljMC05LjIyLTYtMTQuMTItMTMuMTQtMTQuMjMtNy4xMi4xMS0xMy4xNCw1LTEzLjE0LDE0LjIzQTI0LjA4LDI0LjA4LDAsMCwwLDY4LjIzLDg5YzEuNDQsMy44Mi0xLjE1LDUuMjQtMS43LDUuNDQtNy41NCwyLjc0LTE2LjQsNy43LTE2LjQsMTIuNjF2MS44NGMwLDYuNjMsMTIuNzcsOC4xOCwyNC42Nyw4LjIxczI0LjY3LTEuNTgsMjQuNjctOC4yMVYxMDdDOTkuNDgsMTAyLjEyLDkwLjYyLDk3LjE2LDgzLjA4LDk0LjQyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUwLjE0IC01OC42NykiIHN0eWxlPSJmaWxsOiNhOWE5YTkiLz48L3N2Zz4='
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
      },
      src: null
    }

    this.focus = this.focus.bind(this)
    this.blur =this.blur.bind(this)
    this.change = this.change.bind(this)
    this.upload = this.upload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  upload(e) {
    const bHaveFileAPI = (window.File && window.FileReader)
    const self = this
    if (!bHaveFileAPI) {
      alert("This browser doesn't support the File API")
      return
    }
    const thefile = e.target.files[0]

    // check to see if it is text
    if (!thefile.type.match("image.*")) {
      alert("This type of the upload file is not support")
      return
    }
    const reader = new FileReader()

    reader.onload = function (evt) {
      const resultdata = evt.target.result
      self.setState({src : resultdata})
    }
    reader.readAsDataURL(thefile)
  }

  handleSubmit(e) {
    e.preventDefault()

    const nickname = e.target.nickname.value.trim()
    const email = e.target.email.value.trim()
    const password = e.target.password.value.trim()
    const avatar = this.state.src || info.defaultAvatar

    //this.props.dispatch(signUpRequest({ nickname, email, password, avatar }))
    this.props.auth.signUpRequest({ nickname, email, password, avatar })
  }

  render() {
    const { nickname, email, password, valid, count, msg, src } = this.state
    const flag = valid.nickname && valid.password && valid.email ? false : true

    return (
      <form className='sign-up-form' onSubmit={this.handleSubmit}>
        <UploadAvatar upload={this.upload} src={src}/>
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
      <SubmitBtn txt={'SIGN UP'} valid={flag}/>
        <p className='signup note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>
      </form>
  )}
}

SignUpForm.propTypes = {
  dispatch: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm)
