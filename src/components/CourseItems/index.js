import {Link} from 'react-router-dom'
import './index.css'

const CourseItems = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link-items">
      <li className="list-items-container">
        <img className="logo-url" src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItems
