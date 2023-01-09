import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import FailureView from '../FailureView'
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
    originalslist: [],
    trendingNowlist: [],
    trendingloading: apistateoBJ.initial,
    originalloading: apistateoBJ.initial,
  }

  componentDidMount() {
    this.getThebannerImage()
    this.getTrendingnowDetails()
    this.getOriginalsDetails()
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

  getOriginalsDetails = async () => {
    this.setState({
      originalloading: apistateoBJ.inProgress,
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
    const data = await response.json()

    const updatedData = data.results.map(each => ({
      id: each.id,
      backdropPath: each.backdrop_path,
      name: each.title,
      overview: each.overview,
      posterPath: each.poster_path,
    }))
    if (response.ok === true) {
      this.setState({
        originalloading: apistateoBJ.success,
        originalslist: updatedData,
      })
    } else {
      this.setState({
        originalloading: apistateoBJ.failure,
      })
    }
  }

  getTrendingnowDetails = async () => {
    this.setState({
      trendingloading: apistateoBJ.inProgress,
    })
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingloading: apistateoBJ.success,
        trendingNowlist: data.results,
      })
    } else {
      this.setState({
        trendingloading: apistateoBJ.failure,
      })
    }
  }

  renderSuccussView = () => {
    const {banerimageObj} = this.state

    return (
      <div className="loadingContainer">
        <>
          <div
            className="devices-container"
            alt={banerimageObj.title}
            style={{
              backgroundImage: `url(${banerimageObj.backdropPath})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              height: '100%',
            }}
          >
            <Header />
            <div className="heading-container">
              <h1 className=" movie-details-name home-poster-title">
                {banerimageObj.title}
              </h1>
              <h1 className=" movie-details-description home-poster-overview">
                {banerimageObj.overview}
              </h1>
              <button
                className=" movies-details-play-button  home-poster-play-btn"
                type="button"
              >
                Play
              </button>
            </div>
          </div>
          {/* <div
        className="lg-devices"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          height: '100%',
        }}
      >
        <div className="heading-container">
          <h1 className="home-poster-title">{title}</h1>
          <p className="home-poster-overview">{overview}</p>
          <button className="home-poster-play-btn" type="button">
            Play
          </button>
        </div>
      </div> */}
        </>
      </div>
    )
  }

  renderFailureView = () => (
    <>
      <FailureView onRetry={this.tryagain} />
    </>
  )

  loadingView = () => (
    <div className="loadingContainer" testid="loader">
      <Header />
      <div className="loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {
      apiState,
      originalslist,
      trendingNowlist,
      trendingloading,
      originalloading,
    } = this.state
    const settingsLg = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    const settings = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    return (
      <div className="mainHomecontainer">
        {apiState === apistateoBJ.inProgress && <>{this.loadingView()}</>}
        {apiState === apistateoBJ.success && <>{this.renderSuccussView()}</>}
        {apiState === apistateoBJ.failure && (
          <>
            <div className="failurecontainer">
              <img
                src="https://res.cloudinary.com/djomnr5y2/image/upload/v1673265233/Iconerrrr_jzubbd.png"
                alt="failure view"
              />
              <p>Something went wrong. Please try again</p>
              <button type="button" onClick={this.getThebannerImage}>
                Try Again
              </button>
            </div>
          </>
        )}
        <div className="bottomcontainer">
          <ul className="slider-container">
            <h1 className="trendingNowheading">Trending Now</h1>
            {trendingloading === apistateoBJ.success && (
              <>
                <Slider {...settings}>
                  {trendingNowlist.map(each => (
                    <li key={each.id} className="listitem">
                      <Link to={`/movies/${each.id}`}>
                        <img
                          alt={each.title}
                          className="siderimages"
                          src={each.backdrop_path}
                        />
                      </Link>
                    </li>
                  ))}
                </Slider>
              </>
            )}
            {trendingloading === apistateoBJ.inProgress && (
              <>{this.loadingView()}</>
            )}
            {trendingloading === apistateoBJ.failure && (
              <div className="failurecontainer">
                <img
                  src="https://res.cloudinary.com/djomnr5y2/image/upload/v1673265233/Iconerrrr_jzubbd.png"
                  alt="failure view"
                />
                <p>Something went wrong. Please try again</p>
                <button type="button" onClick={this.getTrendingnowDetails}>
                  Try Again
                </button>
              </div>
            )}
          </ul>
          <ul className="slider-container-lg">
            <h1 className="trendingNowheading">Originals</h1>
            {originalloading === apistateoBJ.success && (
              <div>
                <Slider {...settingsLg}>
                  {originalslist.map(each => (
                    <Link to={`/movies/${each.id}`}>
                      <li key={each.id} className="listitem">
                        <img
                          alt={each.name}
                          className="siderimages"
                          src={each.backdropPath}
                        />
                      </li>
                    </Link>
                  ))}
                </Slider>
              </div>
            )}
            {originalloading === apistateoBJ.inProgress && (
              <>{this.loadingView()}</>
            )}
            {originalloading === apistateoBJ.failure && (
              <div className="failurecontainer">
                <img
                  src="https://res.cloudinary.com/djomnr5y2/image/upload/v1673265233/Iconerrrr_jzubbd.png"
                  alt="failure view"
                />
                <p>Something went wrong. Please try again</p>
                <button type="button" onClick={this.getOriginalsDetails}>
                  Try Again
                </button>
              </div>
            )}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
