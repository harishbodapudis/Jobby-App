import {Component} from 'react'
import Cookies from 'js-cookie'
import {VscLocation} from 'react-icons/vsc'
import {FiSearch} from 'react-icons/fi'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class JobsPage extends Component {
  state = {
    searchKey: '',
    salaryRange: '',
    employmentType: [],
    profileData: '',
    searchResults: '',
    profileStatus: '',
    searchResultStatus: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getSearchResults()
  }

  getProfileData = async () => {
    this.setState({profileStatus: ''})
    const jwkToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwkToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const finalData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: finalData, profileStatus: 'SUCCESS'})
    } else {
      this.setState({profileStatus: 'FAILURE'})
    }
  }

  getSearchResults = async () => {
    this.setState({searchResultStatus: ''})
    const {searchKey, salaryRange, employmentType} = this.state
    const empStr = employmentType.join()
    console.log(empStr)
    const jwkToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empStr}&minimum_package=${salaryRange}&search=${searchKey}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwkToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      if (jobs.length > 0) {
        const jobsSearchResults = jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }))
        this.setState({
          searchResults: jobsSearchResults,
          searchResultStatus: 'SUCCESS',
        })
      } else {
        this.setState({
          searchResultStatus: 'NONE',
        })
      }
    } else {
      this.setState({
        searchResultStatus: 'FAILURE',
      })
    }
  }

  navJobDetailsPage = id => {
    const {history} = this.props
    console.log(history, id)
    history.replace(`/jobs/${id}`)
  }

  profileContainer = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-box">
        <div>
          <img src={profileImageUrl} alt="profile" className="male-avatar" />
        </div>
        <h1 className="profile-heading">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  employmentType = data => (
    <li key={data.employmentTypeId} className="employ-item">
      <input
        type="checkbox"
        value={data.employmentTypeId}
        className="employment-type"
        onChange={this.setEmploymentType}
        name={data.employmentTypeId}
        id={data.employmentTypeId}
      />
      <label htmlFor={data.employmentTypeId} className="employment-types-label">
        {data.label}
      </label>
    </li>
  )

  setEmploymentType = event => {
    const {employmentType} = this.state
    const empType = event.target.value
    if (employmentType.includes(empType)) {
      const newData = employmentType.filter(item => item !== empType)
      console.log(newData)
      this.setState({employmentType: newData}, this.getSearchResults)
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getSearchResults,
      )
    }
  }

  salaryRange = data => (
    <li key={data.salaryRangeId} className="salary-item">
      <input
        type="radio"
        className="salary-data"
        name="salaryRange"
        onChange={this.setSalary}
        id={data.salaryRangeId}
        value={data.salaryRangeId}
      />
      <label htmlFor={data.salaryRangeId} className="salary-data">
        {data.label}
      </label>
    </li>
  )

  setSalary = event => {
    console.log('salary....', event.target.value)
    this.setState({salaryRange: event.target.value}, this.getSearchResults)
  }

  setSearchKey = event => {
    this.setState({searchKey: event.target.value})
  }

  renderJobs = data => (
    <li key={data.id}>
      <button
        type="button"
        className="job-data-box"
        onClick={() => this.navJobDetailsPage(data.id)}
      >
        <div className="logo-heading-box">
          <div className="img-box">
            <img
              src={data.companyLogoUrl}
              alt="company logo"
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
          <h1 className="description-heading">Description</h1>
          <p className="description-data">{data.jobDescription}</p>
        </div>
      </button>
    </li>
  )

  retryBtnProfileApiCall = () => this.getProfileData()

  failureProfile = () => (
    <div className="profile-fail">
      <button
        type="button"
        className="retry-btn"
        onClick={() => this.getProfileData()}
      >
        Retry
      </button>
    </div>
  )

  failureSearchResults = () => (
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
        onClick={() => this.getSearchResults()}
      >
        Retry
      </button>
    </div>
  )

  noResults = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="title">No Jobs Found</h1>
      <p className="error-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  loaderBlock = () => (
    <div className="profile-fail" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileData = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case 'SUCCESS':
        return this.profileContainer()
      case 'FAILURE':
        return this.failureProfile()
      default:
        return this.loaderBlock()
    }
  }

  renderSearchResultsData = () => {
    const {searchResultStatus, searchResults} = this.state

    switch (searchResultStatus) {
      case 'SUCCESS':
        return (
          <ul className="jobs-block">
            {searchResults.map(items => this.renderJobs(items))}
          </ul>
        )
      case 'FAILURE':
        return this.failureSearchResults()
      case 'NONE':
        return this.noResults()
      default:
        return this.loaderBlock()
    }
  }

  render() {
    const {employmentType, salaryRange, searchResults, searchKey} = this.state
    console.log(
      'hhhhh...',
      employmentType,
      salaryRange,
      searchKey,
      searchResults,
    )

    return (
      <div>
        <Header />
        <div className="jobs-body">
          <div className="search-box-mb">
            <input
              type="search"
              className="search-field"
              value={searchKey}
              placeholder="Search"
              onChange={this.setSearchKey}
            />
            <button
              type="button"
              onClick={this.getSearchResults}
              data-testid="searchButton"
              className="search-btn"
            >
              <FiSearch className="search-icon" />
            </button>
          </div>
          <div className="filter-box">
            <div className="profile-container">{this.renderProfileData()}</div>
            <div className="employment-filter-box">
              <h1 className="filter-headings">Type of Employment</h1>
              <ul className="employment-items-box">
                {employmentTypesList.map(items => this.employmentType(items))}
              </ul>
            </div>
            <div className="salary-filter-box">
              <h1 className="filter-headings">Salary Range</h1>
              <ul className="salary-items-box">
                {salaryRangesList.map(items => this.salaryRange(items))}
              </ul>
            </div>
          </div>
          <div className="search-results-box">
            <div className="search-box">
              <input
                type="search"
                className="search-field"
                value={searchKey}
                placeholder="Search"
                onChange={this.setSearchKey}
              />
              <button
                type="button"
                onClick={this.getSearchResults}
                data-testid="searchButton"
                className="search-btn"
              >
                <FiSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderSearchResultsData()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsPage
