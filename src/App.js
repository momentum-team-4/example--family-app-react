import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'tachyons'
import Login from './components/Login'
import Home from './components/Home'
import { getUserInfo } from './api'
import clsx from 'clsx'
import NewPost from './components/NewPost'

function App () {
  /*
  Responsible for:
  - storing authToken
  - storing userInfo
  - showing header
  - routing
  */
  const [authToken, _setAuthToken] = useState(window.localStorage.getItem('authtoken'))
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
        <header className={clsx('pa2', { 'bg-washed-green': isLoggedIn, 'bg-washed-red': !isLoggedIn })}>
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
                  <Link to='/new-post/'>Create new post</Link>
                </div>
              )
              : <div><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link></div>
          }

        </header>
        <Switch>
          <Route path='/login'>
            <Login authToken={authToken} onLogin={setAuthToken} />
          </Route>
          <Route path='/register'>
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
