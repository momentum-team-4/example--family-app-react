import React from 'react'
import Posts from './Posts'

export default function Home (props) {
  const { authToken } = props

  return (
    <div className='Home'>
      <Posts authToken={authToken} />
    </div>
  )
}
