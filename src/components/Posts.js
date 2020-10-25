import React, { useState, useEffect } from 'react'
import { getPosts } from '../api'
import Post from './Post'

export default function Posts (props) {
  /*
  Responsible for:
  - retrieving posts from API
  - displaying all posts
  */

  const { authToken } = props
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts(authToken).then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [authToken])

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div className='Posts'>
      {posts.map(post => (
        <Post key={post.url} post={post} />
      ))}
    </div>
  )
}
