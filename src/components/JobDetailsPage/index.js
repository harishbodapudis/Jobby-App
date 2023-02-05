import {Component} from 'react'
import {VscLocation} from 'react-icons/vsc'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

class JobDetailsPage extends Component {
  state = {
    jobSpecs: '',
    skillsReq: '',
    lifeAtCompany: '',
    similarJobsDetails: '',
    jobResultStatus: '',
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.jobDetailsPage(id)
  }

  jobDetailsRetry = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.jobDetailsPage(id)
  }

  jobDetailsPage = async id => {
    this.setState({jobResultStatus: ''})
    const jwtToken = Cookies.get('jwt_token')
    const jobsDataUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsDataUrl, options)
    const jobData = await response.json()

    if (response.ok) {
      const jobDescription = {
        jobDetails: jobData.job_details,
        similarJobs: jobData.similar_jobs,
      }
      const {jobDetails, similarJobs} = jobDescription
      console.log(jobDetails.skills)
      const skillsReq = jobDetails.skills.map(item => ({
        name: item.name,
        imageUrl: item.image_url,
      }))
      const jobSpecs = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const lifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      const similarJobsDetails = similarJobs.map(items => ({
        id: items.id,
        companyLogoUrl: items.company_logo_url,
        employmentType: items.employment_type,
        jobDescription: items.job_description,
        location: items.location,
        rating: items.rating,
        title: items.title,
      }))
      this.setState({
        jobSpecs,
        lifeAtCompany,
        similarJobsDetails,
        skillsReq,
        jobResultStatus: 'SUCCESS',
      })
    } else {
      this.setState({jobResultStatus: 'FAILURE'})
    }
  }

  renderJobs = data => {
    const {companyWebsiteUrl} = data
    return (
      <>
        <div className="logo-heading-box">
          <div className="img-box">
            <img
              src={data.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
          </div>
          <div className="heading-rating-box">
            <h1 className="job-title">{data.title}</h1>
            <div className="start-rating-box">
              <AiFillStar className="star" />
              <p className="rating-text">{data.rating}</p>
            </div>
          </div>
        </div>
        <div className="salary-location-box">
          <div className="location-emp-type-box">
            <div className="location-box">
              <VscLocation className="location" />
              <p className="location-text">{data.location}</p>
            </div>
            <div className="emp-type-box">
              <BsBriefcaseFill className="brf-case" />
              <p className="employment-type-text">{data.employmentType}</p>
            </div>
          </div>
          <div>
            <p className="salary-text">{data.packagePerAnnum}</p>
          </div>
        </div>
        <div className="description-box">
          <div className="heading-link-box">
            <h1 className="description-heading">Description</h1>

            <a href={companyWebsiteUrl} className="link-box">
              <p>Visit</p>
              <FaExternalLinkAlt className="visit-link-btn" />
            </a>
          </div>
          <p className="description-data">{data.jobDescription}</p>
        </div>
      </>
    )
  }

  skillsData = data => (
    <li key={data.name} className="similar-skills-data">
      <img src={data.imageUrl} alt={data.name} className="skill-img" />
      <p className="skill-text">{data.name}</p>
    </li>
  )

  similarJobsBlock = data => (
    <li key={data.id} className="job-similar-data-block">
      <div className="logo-heading-box">
        <div className="img-box">
          <img
            src={data.companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
        </div>
        <div className="heading-rating-box">
          <h1 className="job-title">{data.title}</h1>
          <div className="start-rating-box">
            <AiFillStar className="star" />
            <p className="rating-text">{data.rating}</p>
          </div>
        </div>
      </div>
      <div className="description-box">
        <h1 className="description-heading">Description</h1>
        <p className="description-data">{data.jobDescription}</p>
      </div>
      <div className="salary-location-box">
        <div className="location-emp-type-box">
          <div className="location-box">
            <VscLocation className="location" />
            <p className="location-text">{data.location}</p>
          </div>
          <div className="emp-type-box">
            <BsBriefcaseFill className="brf-case" />
            <p className="employment-type-text">{data.employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )

  loaderBlock = () => (
    <div className="profile-fail" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobResultData = () => {
    const {jobSpecs, lifeAtCompany, similarJobsDetails, skillsReq} = this.state
    return (
      <div className="job-details-box">
        <div className="job-data-block">
          <div>{this.renderJobs(jobSpecs)}</div>
          <div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-box">
              {skillsReq.map(item => this.skillsData(item))}
            </ul>
          </div>
          <div>
            <h1 className="company-life-heading">Life at Company</h1>
            <div className="company-life-box">
              <p className="company-life-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="company-life-img"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="skills-box">
            {similarJobsDetails.map(item => this.similarJobsBlock(item))}
          </ul>
        </div>
      </div>
    )
  }

  failureJobResults = () => (
    <div className="failure-connection">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="title">Oops! Something Went Wrong</h1>
      <p className="error-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={() => this.jobDetailsRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderJobResultData = () => {
    const {jobResultStatus} = this.state

    switch (jobResultStatus) {
      case 'SUCCESS':
        return this.jobResultData()
      case 'FAILURE':
        return this.failureJobResults()
      default:
        return this.loaderBlock()
    }
  }

  render() {
    const {jobSpecs, lifeAtCompany, similarJobsDetails, skillsReq} = this.state
    console.log(jobSpecs, lifeAtCompany, similarJobsDetails, skillsReq)
    return (
      <>
        <Header />
        <div>{this.renderJobResultData()}</div>
      </>
    )
  }
}

export default JobDetailsPage
