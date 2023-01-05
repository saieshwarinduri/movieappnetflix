import Header from '../Header'
import './index.css'

const MovieDetailsposter = props => {
  const {poster} = props

  const {
    backdropPath,
    title,
    overview,
    budget,
    count,
    rating,
    releaseDate,
    runtime,
    adult,
  } = poster

  const date = new Date(releaseDate)
  const year = date.getFullYear()
  const p = adult ? 'A' : 'U/A'
  const hr = Math.floor(runtime / 60)
  const min = runtime - hr * 60
  return (
    <div
      className="devices-container"
      alt={title}
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    >
      <Header />
      <div className="constnetoverview">
        <h1 className="titelofposter">{title}</h1>
        <div className="timeratingyearcon">
          <p>
            {hr}h {min}m
          </p>
          <p>{p}</p>
          <p>{year}</p>
        </div>
        <p>{overview}</p>
        <button type="button">Play</button>
      </div>
    </div>
  )
}

export default MovieDetailsposter
