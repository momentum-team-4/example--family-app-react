import React, { useState } from 'react'
import { createCircle, getCircles, useRemoteData } from '../api'
import { Button, FieldContainer } from './Forms'

export default function CircleList (props) {
  /*
  Responsible for showing list of circles
  */

  const { authToken } = props

  const [name, setName] = useState('')

  const [circles, circlesErr, circlesLoading, reloadCircles] = useRemoteData(
    () => getCircles(authToken),
    {
      dependencies: [authToken]
    }
  )

  const handleSubmit = () => {
    createCircle(authToken, name).then(() => {
      setName('')
      reloadCircles()
    })
  }

  if (circlesErr) {
    return <p>There was a problem loading your circles.</p>
  }

  if (circlesLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='CircleList'>
      <div className='pb3'>
        {circles.map(circle => (
          <div key={circle.id} className='ba bw1 pa2 mb2'>
            <div className='f3 b mb2'>{circle.name}</div>
            <div>{circle.members.join(', ')}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <h2 className='f2 b'>Create a new circle</h2>
        <FieldContainer>
          <label for='circle-name'>Name</label>
          <input type='text' className='w-100 pa2' id='circle-name' value={name} onChange={e => setName(e.target.value)} />
        </FieldContainer>
        <FieldContainer>
          <Button type='submit'>Create circle</Button>
        </FieldContainer>
      </form>
    </div>
  )
}
