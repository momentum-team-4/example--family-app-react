import React from 'react'
import { getPosts, useRemoteData } from '../api'
import Post from './Post'

export default function Posts (props) {
  /*
  Responsible for:
  - retrieving posts from API
  - displaying all posts
  */

  const { authToken } = props

  // const [posts, setPosts] = useState(null)
  // const [postsErr, setPostsErr] = useState(null)
  // const [postsLoading, setPostsLoading] = useState(true)

  // useEffect(() => {
  //   setPostsLoading(true)
  //   getPosts(authToken)
  //     .then(posts => {
  //       setPosts(posts)
  //       setPostsLoading(false)
  //     })
  //     .catch(error => {
  //       setPostsErr(error)
  //       setPostsLoading(false)
  //     })
  // }, [authToken])

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
      {posts.map(post => (
        <Post key={post.url} post={post} />
      ))}
    </div>
  )
}
