import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import CourseItems from '../CourseItems'

class Courses extends Component {
  state = {coursesData: [], isLoading: true, isError: false}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({isLoading: true, isError: false})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        logoUrl: eachData.logo_url,
      }))
      this.setState({coursesData: formattedData, isLoading: false})
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getCourses}>
        Retry
      </button>
    </div>
  )

  render() {
    const {coursesData, isLoading, isError} = this.state
    return (
      <div className="tech-era-container">
        <h1 className="courses-heading">Courses</h1>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )}
        {!isLoading && isError && this.renderFailureView()}
        {!isLoading && !isError && (
          <ul className="list-items">
            {coursesData.map(eachItem => (
              <CourseItems key={eachItem.id} courseDetails={eachItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Courses
