import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const {history} = props

  const deletecookie = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="loadingContainer mainHomecontainer">
      <Header />
      <div className="accountContentcontainer">
        <div className="contnennnffnnf">
          <h1>Account</h1>
          <hr className="line" />
          <div className="memusepassconatiner">
            <div className="membershipconatiner">
              <p className="parag">Member ship</p>
            </div>
            <div className="membershipconatiner">
              <p className="parag">rahul@gmail.com</p>
              <p className="parag">Password:********</p>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="plansPremium">
          <p className="palndetaisl">Plan details</p>
          <p className="premium">Premium </p>
          <p>Ultra HD</p>
        </div>
        <hr className="line" />
        <div className="buttonconatiner">
          <button type="button" onClick={deletecookie}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Account
