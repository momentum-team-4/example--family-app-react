import React from 'react'
import { Link } from 'react-router-dom'
import { getPosts, useRemoteData } from '../api'
import Post from './Post'

export default function Posts (props) {
  /*
  Responsible for:
  - retrieving posts from API
  - displaying all posts
  */

  const { authToken } = props

  const [posts, postsErr, postsLoading] = useRemoteData(
    () => getPosts(authToken),
    { dependencies: [authToken] }
  )

  if (postsLoading) {
    return <p>Loading...</p>
  }

  if (postsErr) {
    return <p>There was an error loading your posts.</p>
  }

  return (
    <div className='Posts'>
      <div>
        <Link className='mv2' to='/new-post/'>Create a new post</Link>
      </div>
      {posts.map(post => (
        <Post key={post.url} post={post} />
      ))}
    </div>
  )
}
