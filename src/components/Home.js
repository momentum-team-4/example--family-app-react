import React from 'react'
import PropTypes from 'prop-types'
import Posts from './Posts'

export default function Home (props) {
  const { authToken } = props

  return (
    <div className='Home'>
      <Posts authToken={authToken} />
    </div>
  )
}

Home.propTypes = {
  authToken: PropTypes.string.isRequired
}
