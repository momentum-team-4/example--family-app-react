import PropTypes from 'prop-types'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import circleImg from '../img/circles.svg'

export default function NavBar (props) {
  /*
  Responsible for:
  - showing header
  */
  const { isLoggedIn, userInfo } = props
  return (
    <header className='NavBar'>
      <div className='pa2 flex items-center'>
        <Link to='/'><img className='h3 mr2' src={circleImg} alt='Circles logo' /></Link>
        <div className='flex flex-auto items-center justify-between'>
          <h1 className='f2 ma0 pa0 lh-solid'>
            <Link to='/' className='no-underline black'>Circles</Link>
          </h1>
          <div className='lh-solid'>
            {
              isLoggedIn
                ? (
                  <span>
                    {userInfo && <span>Hi, {userInfo.name}! </span>}
                    <Link to='/logout/'>Log out</Link>
                  </span>)
                : (
                  <span>
                    <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                  </span>)
            }
          </div>
        </div>
      </div>
      <div className='flex mb3'>
        <div className='mr2'>
          <NavLink exact to='/'>All posts</NavLink>
        </div>
        <div className='mr2'>
          <NavLink to='/new-post/'>Create a new post</NavLink>
        </div>
        <div className='mr2'>
          <NavLink exact to='/circles/'>My circles</NavLink>
        </div>
      </div>
    </header>
  )
}

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string
  })
}
