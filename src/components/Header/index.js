import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const logoutFromPage = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-box">
      <li className="logo-box">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </li>
      <li className="home-job-links-box ">
        <Link to="/" className="link-box">
          <h1 className="home-text">Home</h1>
        </Link>
        <Link to="/jobs" className="link-box">
          <h1 className="jobs-text">Jobs</h1>
        </Link>
      </li>
      <li>
        <button type="button" className="logout-btn" onClick={logoutFromPage}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
