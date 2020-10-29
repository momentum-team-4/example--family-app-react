import React from 'react'
import PropTypes from 'prop-types'
import { parse, format } from 'fecha'
import { Link } from 'react-router-dom'

export default function Post ({ post }) {
  /*
  Responsible for displaying a post, whether it came from the API or is a new post being created
  */
  let postedAt = post.posted_at
  if (typeof postedAt === 'string') {
    postedAt = parse(postedAt, 'isoDateTime')
  }
  postedAt = format(postedAt, 'MMM D, YYYY hh:mm A')

  return (
    <div className='Post pa2 ba bw1 mv2'>
      <div className='mb2'>
        <b>{post.author}</b>{' '}
        <span className='f6'>{postedAt}</span>
      </div>
      <div className='mb2'>
        <Link to={`/circles/${post.circle.pk}`}><i>{post.circle.name}</i></Link>
      </div>
      <div className='mv2'>{post.body}</div>
      {post.image && (
        <div className='mv2'>
          <img src={post.image} />
        </div>
      )}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    circle: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    body: PropTypes.string.isRequired,
    image: PropTypes.string,
    posted_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
  }).isRequired
}
