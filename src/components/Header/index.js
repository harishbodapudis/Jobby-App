import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

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
          <AiFillHome className="home-icon" />
        </Link>
        <Link to="/jobs" className="link-box">
          <h1 className="jobs-text">Jobs</h1>
          <BsBriefcase className="jobs-icon" />
        </Link>
      </li>
      <li>
        <button type="button" className="logout-btn" onClick={logoutFromPage}>
          Logout
        </button>
        <button
          type="button"
          className="logout-icon-btn"
          onClick={logoutFromPage}
        >
          <FiLogOut className="logout-icon" />
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
