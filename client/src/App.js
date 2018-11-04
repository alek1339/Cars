import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import PrivateRoute from './components/common/PrivateRoute'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import News from './components/layout/News'
import Dashboard from './components/layout/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Cars from './components/layout/Cars'

import EditNews from './components/edit-news/EditNews'
import EditOneNews from './components/edit-news/EditOneNews'
import NewsId from './components/layout/NewsId'

import AddNews from './components/add-news/AddNews'
import AddCar from './components/add-cars/AddCar'

import EditCars from './components/edit-car/EditCars'
import EditOneCar from './components/edit-car/EditOneCar'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />

            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/news' component={News} />
              <Route exact path='/add-car' component={AddCar} />
              <Route exact path='/add-news' component={AddNews} />
              <Route exact path='/edit-news' component={EditNews} />
              <Route exact path='/edit-cars' component={EditCars} />
              <Route path='/news/id/' component={NewsId} />
              <Route path='/edit-one-car' component={EditOneCar} />
              <Route path='/edit-one-news' component={EditOneNews} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/cars' component={Cars} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
