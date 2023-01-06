import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomePoster from '../HomePoster'
import MovieDetailsposter from '../Moviedetailsposter'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apistateoBJ = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemdetails extends Component {
  state = {
    moviedetails: [],
    genresData: [],
    spokenLanguages: [],
    similarMovies: [],
    apistate: apistateoBJ.initial,
  }

  componentDidMount() {
    this.getThemoviedetails()
  }

  getThemoviedetails = async () => {
    this.setState({
      apistate: apistateoBJ.inProgress,
    })
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        originalLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
        adult: each.adult,
      }))
      // console.log(updatedData)
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      // console.log(genresData)
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      // console.log(updatedSimilarData)
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )
      this.setState({
        similarMovies: updatedSimilarData,
        spokenLanguages: updatedLanguagesData,
        apistate: apistateoBJ.success,
        moviedetails: updatedData[0],
        genresData,
        apiState: apistateoBJ.success,
      })
    }
  }

  tryagain = () => {
    this.getThemoviedetails()
  }

  renderSuccussView = () => {
    const {moviedetails} = this.state
    return (
      <div className="loadingContainer">
        <MovieDetailsposter poster={moviedetails} />
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
    const {
      apistate,
      genresData,
      spokenLanguages,
      moviedetails,
      similarMovies,
    } = this.state

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const d = new Date()
    const month = monthNames[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()
    let abri = null
    switch (date) {
      case 1:
        abri = 'st'
        break
      case 2:
        abri = 'nd'
        break
      case 3:
        abri = 'rd'
        break

      default:
        abri = 'th'
        break
    }

    return (
      <div className="mainHomecontainer">
        {apistate === apistateoBJ.inProgress && <>{this.loadingView()}</>}
        {apistate === apistateoBJ.success && <>{this.renderSuccussView()}</>}
        {apistate === apistateoBJ.failure && <>{this.renderFailureView()}</>}
        <div className="bottomcontainer">
          <div className="detailscontainer">
            <ul className="genersContainer">
              <h1 className="genresheading">Genres</h1>
              {genresData.map(each => (
                <p className="deatilename" key={each.id}>
                  {each.name}
                </p>
              ))}
            </ul>
            <ul className="genersContainer">
              <h1 className="genresheading">Audio Available</h1>
              {spokenLanguages.map(each => (
                <p className="deatilename" key={each.id}>
                  {each.language}
                </p>
              ))}
            </ul>
            <div className="genersContainer">
              <h1 className="genresheading">Rating Count</h1>
              <p className="counta">{moviedetails.count}</p>
              <h1 className="genresheading">Rating Average</h1>
              <p className="counta">{moviedetails.rating}</p>
            </div>
            <div className="genersContainer">
              <h1 className="genresheading">Budget</h1>
              <p className="counta">{moviedetails.budget}</p>
              <h1 className="genresheading">Release Date</h1>
              <p className="counta">{moviedetails.releaseDate}</p>
            </div>
          </div>
          <div>
            <h1 className="morelikeThis">More like this</h1>
            <ul className="detailscontainer">
              {similarMovies.map(each => (
                <li key={each.id}>
                  <img
                    className="similarMovieimage"
                    src={each.posterPath}
                    alt={each.title}
                  />
                </li>
              ))}
            </ul>
          </div>
          <>
            <Footer />
          </>
        </div>
      </div>
    )
  }
}

export default MovieItemdetails
