import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: ''}

  setUsername = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  checkUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const loginData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({username: '', password: '', errorMsg: data.error_msg})
      this.setCookie(data)
    } else {
      this.setState({username: '', password: '', errorMsg: data.error_msg})
    }
  }

  setCookie = data => {
    const {history} = this.props
    Cookies.set('jwt_token', data.jwt_token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    let msg = ''
    if (errorMsg) {
      msg = `*${errorMsg}`
    }

    return (
      <div className="form-container">
        <div className="form-box">
          <div className="form-logo-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="login-form-image"
            />
          </div>
          <form onSubmit={this.checkUserDetails} className="login-form">
            <div className="username-box">
              <div className="username-label">
                <label htmlFor="username">USERNAME</label>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                className="username"
                value={username}
                placeholder="Username"
                onChange={this.setUsername}
              />
            </div>
            <div className="password-box">
              <div className="password-label">
                <label htmlFor="password">PASSWORD</label>
              </div>
              <input
                type="password"
                name="password"
                className="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={this.setPassword}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="error-data">{msg}</p>
        </div>
      </div>
    )
  }
}

export default LoginPage
