import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createPost, getCircles, useRemoteData } from '../api'
import { Button, FieldContainer } from './Forms'
import Post from './Post'

export default function NewPost (props) {
  /*
  Form for creating a new post
  */

  const { authToken, userInfo } = props

  const [body, setBody] = useState('')
  const [circleUrl, setCircleUrl] = useState('')
  const [circles, circlesErr, circlesLoading] = useRemoteData(
    () => getCircles(authToken),
    {
      dependencies: [authToken]
    })
  const [postCreated, setPostCreated] = useState(false)

  function handleSubmit (event) {
    event.preventDefault()

    createPost(authToken, body, circleUrl)
      .then(data => {
        setPostCreated(true)
      })
  }

  if (circlesLoading) {
    return <div>Loading...</div>
  }

  if (circlesErr) {
    return <div>There was an error loading your circles.</div>
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
        posted_at: new Date()
      }}
      />

      <form onSubmit={handleSubmit}>
        <FieldContainer>
          <label htmlFor='circle'>
          Circle:
          </label>
          <select
            id='circle'
            className='w-100 pa2'
            value={circleUrl}
            onChange={e => setCircleUrl(e.target.value)}
            required
          >
            <option value=''>Select a circle...</option>
            {circles.map(circle => (
              <option value={circle.url} key={circle.url}>{circle.name}</option>
            ))}
          </select>
        </FieldContainer>
        <FieldContainer>
          <label htmlFor='body'>
          Post body:
          </label>
          <textarea
            className='w-100 pa2'
            id='body'
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </FieldContainer>
        <FieldContainer>
          <Button classes='hover-bg-washed-blue' type='submit'>
            Create post
          </Button>
        </FieldContainer>

      </form>
    </div>
  )
}
