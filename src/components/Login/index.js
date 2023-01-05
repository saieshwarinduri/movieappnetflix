import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', errorstate: false}

  setusername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  setPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      errorstate: true,
    })
  }

  onSubmitSuccess = JWTtoken => {
    const {history} = this.props
    Cookies.set('jwt_token', JWTtoken, {expires: 2})
    history.replace('/')
  }

  render() {
    const {username, password, errorstate, errorMsg} = this.state
    return (
      <div className="loginMaincontainer">
        <div className="Logocontainer">
          <img
            src="https://res.cloudinary.com/djomnr5y2/image/upload/v1672743874/Group_7399_naruz5.png"
            alt="login website logo"
          />
        </div>
        <div className="loginboxContainer">
          <form className="loginFormcontainer" onSubmit={this.onSubmit}>
            <h1 className="heading">Login</h1>
            <div className="inputlabelUsernaemcon">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.setusername}
                placeholder="Username"
                type="text"
                className="input"
                id="username"
                value={username}
              />
            </div>
            <div className="inputlabelUsernaemcon">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.setPassword}
                placeholder="Password"
                type="password"
                className="input"
                id="password"
                value={password}
              />
            </div>
            {errorstate && <p className="errorMsgg">{errorMsg}</p>}
            <button className="LoginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
