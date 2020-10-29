import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function LogoutPage (props) {
  props.setAuthToken(null)
  return <Redirect to='/' />
}

LogoutPage.propTypes = {
  setAuthToken: PropTypes.func.isRequired
}
