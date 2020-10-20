import React, { useState } from 'react'
import axios from 'axios'
import { login } from '../api'

export default function Login (props) {
  const { onLogin } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  function handleLogin (event) {
    event.preventDefault()

    login(email, password)
      .then(function (data) {
        setMessage('Logged in successfully. Token: ' + data.auth_token)
        onLogin(data.auth_token)
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          setMessage('Invalid email or password.')
        } else {
          setMessage('Something went wrong! Please try again later.')
        }
      })
  }

  return (
    <div className='Login'>
      {message &&
        <div className='mv2 pa2 ba bw1 b--black bg-light-gray'>
          {message}
        </div>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className='mv3'>
          <button className='pa2' type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}
