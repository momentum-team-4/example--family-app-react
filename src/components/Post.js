import React from 'react'

export default function Post ({ post }) {
  /*
  Responsible for displaying a post, whether it came from the API or is a new post being created
  */

  return (
    <div className='Post pa2 ba bw1 mv2'>
      <div className='mb2'>
        <b>{post.author}</b>{' '}
        <span className='f6'>{post.posted_at}</span>
      </div>
      <div className='mb2'>
        <i>{post.circle.name}</i>
      </div>
      <div className='mv2'>{post.body}</div>
    </div>
  )
}
