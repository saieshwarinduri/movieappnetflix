import {Redirect, Route} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Home from '../Home'

class Protectedroute extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...this.props} />
  }
}

export default Protectedroute
