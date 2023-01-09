import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apistate = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  succuss: 'SUCCUSS',
  failure: 'FAILURE',
}
class Popularmovies extends Component {
  state = {popularMovielist: [], apiState: apistate.initial}

  componentDidMount() {
    this.getTrendingnowDetails()
  }

  getTrendingnowDetails = async () => {
    this.setState({
      apiState: apistate.inProgress,
    })
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        apiState: apistate.succuss,
        popularMovielist: data.results,
      })
    } else {
      this.setState({
        apiState: apistate.failure,
      })
    }
  }

  tryagain = () => {
    this.getTrendingnowDetails()
  }

  loadingView = () => (
    <div className="loadingContainer">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="loadingContainer failurecontainer">
      <img
        src="https://res.cloudinary.com/djomnr5y2/image/upload/v1672759760/Background-Completebackfaileimage_yzrhyi.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="tryagainbutton" onClick={this.tryagain}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {popularMovielist, apiState} = this.state

    return (
      <div className="mainHomecontainer">
        <Header />
        {apiState === apistate.inProgress && <>{this.loadingView()}</>}
        {apiState === apistate.succuss && (
          <ul className="popularlistconatiner">
            {popularMovielist.map(each => (
              <li key={each.id}>
                <Link to={`/movies/${each.id}`}>
                  <img
                    className="popularimage"
                    src={each.poster_path}
                    alt={each.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {apiState === apistate.failure && <>{this.renderFailureView()}</>}
        <Footer />
      </div>
    )
  }
}

export default Popularmovies
