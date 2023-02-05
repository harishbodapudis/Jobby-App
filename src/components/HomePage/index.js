import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="home-bg-image">
    <Header />
    <div className="home-page-data">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>

      <Link to="/jobs" className="find-jobs-tab">
        <button type="button" className="find-jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
