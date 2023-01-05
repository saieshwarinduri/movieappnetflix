import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

class Orinals extends Component {
  state = {trendingNowlist: [], loading: false}

  componentDidMount() {
    this.getTrendingnowDetails()
  }

  getTrendingnowDetails = async () => {
    this.setState({
      loading: true,
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
    if (response.ok === true) {
      this.setState({
        loading: false,
        trendingNowlist: data.results,
      })
    }
  }

  loadingView = () => (
    <div className="loadingContainer">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {trendingNowlist} = this.state
    const settingsLg = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    return (
      <>
        <ul className="slider-container-lg">
          <h1 className="trendingNowheading">Originals</h1>
          <Slider {...settingsLg}>
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
        </ul>
      </>
    )
  }
}

export default Orinals
