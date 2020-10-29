import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPosts, getWithAuth } from '../api'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroller'

export default function Posts (props) {
  /*
  Responsible for:
  - retrieving posts from API
  - displaying all posts
  */

  const { authToken, circlePk } = props

  const [posts, setPosts] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [postsErr, setPostsErr] = useState(null)
  const [postsLoading, setPostsLoading] = useState(true)

  function getMorePosts () {
    if (nextUrl && !postsLoading) {
      setPostsLoading(true)
      getWithAuth(authToken, nextUrl).then(addPosts).catch(handleError)
    }
  }

  function addPosts (data) {
    setPosts(posts.concat(data.results))
    setNextUrl(data.next)
    setPostsLoading(false)
  }

  function handleError (error) {
    setPostsErr(error)
    setNextUrl(null)
    setPostsLoading(false)
  }

  useEffect(() => {
    setPostsLoading(true)
    getPosts(authToken, circlePk)
      .then(addPosts)
      .catch(handleError)
  }, [authToken, circlePk]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='Posts'>
      <InfiniteScroll
        initialLoad={false}
        loadMore={getMorePosts}
        hasMore={!!nextUrl}
        loader={<p key={0}>Loading...</p>}
      >
        {posts.map(post => (
          <Post key={post.url} post={post} />
        ))}
      </InfiniteScroll>
      {postsErr && (
        <p>There was an error loading your posts.</p>
      )}
    </div>
  )
}

Posts.propTypes = {
  authToken: PropTypes.string.isRequired
}
