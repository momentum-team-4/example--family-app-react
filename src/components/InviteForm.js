import React, { useState } from 'react'
import { Button, FieldContainer, handleChange } from './Forms'

// TODO finish -- send request to back-end to send invite

export default function InviteForm ({ circlePk }) {
  const [user, setUser] = useState('')
  const [role, setRole] = useState('MEMBER')

  return (
    <div className='InviteForm'>
      <form>
        <FieldContainer>
          <label htmlFor='user'>User</label>
          <input type='email' id='user' value={user} onChange={handleChange(setUser)} />
        </FieldContainer>

        <FieldContainer>
          <label htmlFor='role'>Role</label>
          <select id='role' value={role} onChange={handleChange(setRole)}>
            <option value='MEMBER'>Member</option>
            <option value='ADMIN'>Admin</option>
            <option value='OWNER'>Owner</option>
          </select>
        </FieldContainer>

        <FieldContainer>
          <Button type='submit'>Invite new member</Button>
        </FieldContainer>
      </form>
    </div>
  )
}
