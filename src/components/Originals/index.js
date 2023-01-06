import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
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

    const updatedData = data.results.map(each => ({
      id: each.id,
      backdropPath: each.backdrop_path,
      name: each.title,
      overview: each.overview,
      posterPath: each.poster_path,
    }))
    if (response.ok === true) {
      this.setState({
        loading: false,
        trendingNowlist: updatedData,
      })
    }
  }

  render() {
    const {trendingNowlist} = this.state
    const settingsLg = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    return (
      <>
        <Slider {...settingsLg}>
          {trendingNowlist.map(each => (
            <li key={each.id} className="listitem">
              <Link to={`/movies/${each.id}`}>
                <img
                  alt={each.name}
                  className="siderimages"
                  src={each.backdropPath}
                />
              </Link>
            </li>
          ))}
        </Slider>
      </>
    )
  }
}

export default Orinals
