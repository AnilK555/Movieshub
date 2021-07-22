import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LogIn from './components/LogIn'

import HomePage from './components/HomePage'

import Popular from './components/PopularPages'

import Account from './components/ProfileDetails'

import SearchMovie from './components/SearchMovie'

import MovieDetailsPage from './components/movieDetailsPage'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/LogIn" component={LogIn} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/popularMovies" component={Popular} />
      <Route exact path="/accountDetails" component={Account} />
      <Route exact path="/searchResult" component={SearchMovie} />
      <Route exact path="/movieDetails/:id" component={MovieDetailsPage} />
    </Switch>
  </BrowserRouter>
)

export default App
