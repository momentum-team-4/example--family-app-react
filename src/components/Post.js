import React from 'react'
import { parse, format } from 'fecha'

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
        <i>{post.circle.name}</i>
      </div>
      <div className='mv2'>{post.body}</div>
    </div>
  )
}
