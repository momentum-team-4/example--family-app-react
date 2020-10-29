import React from 'react'
import PropTypes from 'prop-types'
import Posts from './Posts'

export default function HomePage (props) {
  const { authToken } = props

  return (
    <div className='Home'>
      <Posts authToken={authToken} />
    </div>
  )
}

HomePage.propTypes = {
  authToken: PropTypes.string.isRequired
}
