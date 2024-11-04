import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import CourseItems from '../CourseItems'

class Courses extends Component {
  state = {coursesData: [], isLoading: true}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()

    const formattedData = data.courses.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      logoUrl: eachData.logo_url,
    }))
    this.setState({coursesData: formattedData, isLoading: false})
  }

  render() {
    const {coursesData, isLoading} = this.state
    return (
      <div className="tech-era-container">
        <div>
          <h1 className="courses-heading">Courses</h1>
        </div>
        <ul className="list-items">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            coursesData.map(eachItem => (
              <CourseItems key={eachItem.id} courseDetails={eachItem} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default Courses
