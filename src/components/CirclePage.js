import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCircle, useRemoteData } from '../api'
import InviteForm from './InviteForm'
import { Button } from './Forms'
import Posts from './Posts'

export default function CirclePage ({ authToken }) {
  const { pk } = useParams()

  const [circle, circleErr, circleLoading] = useRemoteData(() => getCircle(authToken, pk), {
    dependencies: [authToken, pk]
  })

  const [showInviteForm, setShowInviteForm] = useState(false)

  if (circleLoading) {
    return <div>Loading...</div>
  }

  if (circleErr) {
    return <div>There was a problem loading your circle.</div>
  }

  const isOwnerOrAdmin = (circle.role === 'OWNER' || circle.role === 'ADMIN')

  return (
    <div className='CirclePage'>
      <h2 className='f3 b mb2'>{circle.name}</h2>
      <div>
        <strong>Members:</strong> {circle.members.join(', ')}
      </div>

      {isOwnerOrAdmin &&
      (showInviteForm
        ? (
          <div className='mv2'>
            <InviteForm circlePk={pk} />
          </div>
        )
        : (
          <div className='mv2'>
            <Button onClick={() => setShowInviteForm(true)}>Invite a member</Button>
          </div>
        )
      )}
      <div className='mv2'>
        <Posts authToken={authToken} circlePk={pk} />
      </div>
    </div>
  )
}
