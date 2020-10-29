import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'tachyons'
import { getUserInfo, useRemoteData } from './api'
import CirclePage from './components/CirclePage'
import CircleListPage from './components/CircleListPage'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import LogoutPage from './components/LogoutPage'
import NavBar from './components/NavBar'
import NewPostPage from './components/NewPostPage'

function App () {
  /*
  Responsible for:
  - storing authToken
  - storing userInfo
  - routing
  */
  const [authToken, _setAuthToken] = useState(window.localStorage.getItem('authtoken'))
  const setAuthToken = (token) => {
    _setAuthToken(token)
    if (token === null) {
      window.localStorage.removeItem('authtoken')
    } else {
      window.localStorage.setItem('authtoken', token)
    }
  }

  const isLoggedIn = authToken !== null

  const [userInfo] = useRemoteData(() => {
    if (authToken) {
      return getUserInfo(authToken)
    } else {
      return new Promise((resolve) => resolve(null))
    }
  }, {
    dependencies: [authToken]
  })

  return (
    <Router>
      <div className='App'>
        <NavBar isLoggedIn={isLoggedIn} userInfo={userInfo} />

        <Switch>
          <Route path='/login/'>
            <LoginPage authToken={authToken} onLogin={setAuthToken} />
          </Route>
          <Route path='/logout/'>
            <LogoutPage setAuthToken={setAuthToken} />
          </Route>
          <Route path='/register/'>
            <p>Registration form</p>
          </Route>
          <Route path='/new-post/'>
            <NewPostPage authToken={authToken} userInfo={userInfo || {}} />
          </Route>
          <Route path='/circles/:pk/'>
            <CirclePage authToken={authToken} />
          </Route>
          <Route path='/circles/'>
            <CircleListPage authToken={authToken} />
          </Route>
          <Route path='/'>
            <HomePage authToken={authToken} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
