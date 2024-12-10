import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class CourseItemDetails extends Component {
  state = {courseData: {}, isLoading: true, isError: false}

  componentDidMount() {
    this.getCourseItemData()
  }

  getCourseItemData = async () => {
    this.setState({isLoading: true, isError: false})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({courseData: updatedData, isLoading: false})
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        className="failure-logo"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getCourseItemData}>
        Retry
      </button>
    </div>
  )

  renderCourseItemDetails = () => {
    const {courseData} = this.state
    const {name, imageUrl, description} = courseData
    return (
      <div className="course-item-container">
        <img src={imageUrl} alt={name} className="image" />
        <div className="text-container">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, isError} = this.state

    return (
      <div>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )}
        {!isLoading && isError && this.renderFailureView()}
        {!isLoading && !isError && this.renderCourseItemDetails()}
      </div>
    )
  }
}

export default CourseItemDetails
