import {Link} from 'react-router-dom'

import './index.css'

const PageNotFound = () => (
  <div className="pagenotFoundbackground">
    <div className="pagenotFoundcontentContainer">
      <h1 className="lostYourWay">Lost Your Way</h1>
      <p className="ntFoundparagraph">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button">Go to Home</button>
      </Link>
    </div>
  </div>
)

export default PageNotFound
