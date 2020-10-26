import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'tachyons'
import { getUserInfo, useRemoteData } from './api'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import NavBar from './components/NavBar'
import NewPost from './components/NewPost'

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
            <Login authToken={authToken} onLogin={setAuthToken} />
          </Route>
          <Route path='/logout/'>
            <Logout setAuthToken={setAuthToken} />
          </Route>
          <Route path='/register/'>
            <p>Registration form</p>
          </Route>
          <Route path='/new-post/'>
            <NewPost authToken={authToken} userInfo={userInfo || {}} />
          </Route>
          <Route path='/'>
            <Home authToken={authToken} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
