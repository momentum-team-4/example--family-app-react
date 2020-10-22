import React, { useEffect, useState } from 'react'
import Post from './Post'
import { createPost, getCircles } from '../api'
import { Redirect } from 'react-router-dom'

export default function NewPost (props) {
  /*
  Form for creating a new post
  */

  const { authToken, userInfo } = props

  const [body, setBody] = useState('')
  const [circleUrl, setCircleUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [circles, setCircles] = useState(null)
  const [postCreated, setPostCreated] = useState(false)

  useEffect(() => {
    getCircles(authToken).then(circles => {
      setCircles(circles)
      setLoading(false)
    })
  }, [authToken])

  function handleSubmit (event) {
    event.preventDefault()

    createPost(authToken, body, circleUrl)
      .then(data => {
        setPostCreated(true)
      })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (postCreated) {
    return <Redirect to='/' />
  }

  let circleName = ''
  const currentCircle = circles.find(circle => circle.url === circleUrl)
  if (currentCircle) {
    circleName = currentCircle.name
  }

  return (
    <div className='NewPost'>
      <h2 className='f3'>Post preview</h2>

      <Post post={{
        author: userInfo.name,
        body: body,
        circle: {
          url: circleUrl,
          name: circleName
        },
        posted_at: '2020-01-01'
      }}
      />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='body'>
          Circle:
          </label>
          <select
            className='w-100'
            value={circleUrl}
            onChange={e => setCircleUrl(e.target.value)}
            required
          >
            <option value=''>Select a circle...</option>
            {circles.map(circle => (
              <option value={circle.url} key={circle.url}>{circle.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='body'>
          Post body:
          </label>
          <textarea
            className='w-100'
            id='body'
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <div>
            <button type='submit'>Create post</button>
          </div>
        </div>
      </form>
    </div>
  )
}
