import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Logout (props) {
  props.setAuthToken(null)
  return <Redirect to='/' />
}

Logout.propTypes = {
  setAuthToken: PropTypes.func.isRequired
}
