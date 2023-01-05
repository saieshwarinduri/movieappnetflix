import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomePoster from '../HomePoster'
import TrendingNow from '../TrendingNow'
import Orinals from '../Originals'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apistateoBJ = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    banerimageObj: {},
    apiState: apistateoBJ.initial,
  }

  componentDidMount() {
    this.getThebannerImage()
  }

  tryagain = () => {
    this.getThebannerImage()
  }

  getThebannerImage = async () => {
    this.setState({
      apiState: apistateoBJ.inProgress,
    })
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const bannerImgObj = await response.json()
    if (response.ok === true) {
      const randomObj =
        bannerImgObj.results[
          Math.floor(Math.random() * bannerImgObj.results.length)
        ]
      const updatedRandomObj = {
        id: randomObj.id,
        title: randomObj.title,
        posterPath: randomObj.poster_path,
        backdropPath: randomObj.backdrop_path,
        overview: randomObj.overview,
      }
      this.setState({
        apiState: apistateoBJ.success,
        banerimageObj: {...updatedRandomObj},
      })
    } else {
      this.setState({
        apiState: apistateoBJ.failure,
      })
    }
  }

  renderSuccussView = () => {
    const {banerimageObj} = this.state
    return (
      <div className="loadingContainer">
        <HomePoster poster={banerimageObj} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="loadingContainer failurecontainer">
      <img
        src="https://res.cloudinary.com/djomnr5y2/image/upload/v1672759760/Background-Completebackfaileimage_yzrhyi.png"
        alt="failure view"
      />
      <button type="button" className="tryagainbutton" onClick={this.tryagain}>
        Try again
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loadingContainer">
      <Header />
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {apiState} = this.state
    return (
      <div className="mainHomecontainer">
        {apiState === apistateoBJ.inProgress && <>{this.loadingView()}</>}
        {apiState === apistateoBJ.success && <>{this.renderSuccussView()}</>}
        {apiState === apistateoBJ.failure && <>{this.renderFailureView()}</>}
        <div className="bottomcontainer">
          <>
            <TrendingNow />
          </>
          <>
            <Orinals />
          </>
          <>
            <Footer />
          </>
        </div>
      </div>
    )
  }
}

export default Home
