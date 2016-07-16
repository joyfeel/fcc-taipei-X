import App from '../components/App'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //boolean
      loggedIn: auth.loggedIn()
    }
  }
  render() {
    return (
      <div>
        <ul>
          <li>{this.state.loggedIn ? (<Link to="/logout">Log out</Link>) : (<Link to="/login">Sign in</Link>)}</li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/github">Github</Link></li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedin && '[not@@]'} logged in.</p>}
      </div>
    )
  }
}

export default App
