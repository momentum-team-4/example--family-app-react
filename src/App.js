import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'tachyons'
import Login from './components/Login'
import { getUserInfo } from './api'

function App () {
  const [authToken, _setAuthToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const setAuthToken = (token) => {
    _setAuthToken(token)
    if (token === null) {
      window.localStorage.removeItem('authtoken')
    } else {
      window.localStorage.setItem('authtoken', token)
    }
  }

  const isLoggedIn = authToken !== null

  useEffect(() => {
    const token = window.localStorage.getItem('authtoken')
    if (token) {
      _setAuthToken(token)
    }
  }, [])

  useEffect(() => {
    if (authToken) {
      getUserInfo(authToken)
        .then(info => setUserInfo(info))
    } else {
      setUserInfo(null)
    }
  }, [authToken])

  return (
    <Router>
      <div className='App'>
        <header>
          {
            isLoggedIn
              ? (
                <div>
                  Hi, {userInfo ? userInfo.name : 'user'}!{' '}
                  <button onClick={() => {
                    setAuthToken(null)
                  }}
                  >
                    Log out
                  </button>
                </div>
              )
              : <div><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link></div>
          }

        </header>
        <Switch>
          <Route path='/login'>
            <Login onLogin={setAuthToken} />
          </Route>
          <Route path='/register'>
            <p>Registration form</p>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
