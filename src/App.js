import {Switch, Route, Redirect} from 'react-router-dom'

import Protectedroute from './components/Protectedroute'
import Popularmovies from './components/Popularmovies'
import Login from './components/Login'
import PageNotFound from './components/Pagenotfound'
import Home from './components/Home'
import Search from './components/SearchRoute'
import Account from './components/Account'
import MovieItemdetails from './components/MovieItemDetails'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Protectedroute exact path="/" component={Home} />
      <Protectedroute exact path="/popular" component={Popularmovies} />
      <Protectedroute exact path="/movies/:id" component={MovieItemdetails} />
      <Protectedroute exact path="/search" component={Search} />
      <Protectedroute exact path="/account" component={Account} />
      <Route exact path="/not-found" component={PageNotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
