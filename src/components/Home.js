import React, { useEffect, useState } from 'react'
import { getExampleData } from '../api'

export default function Home (props) {
  const { authToken } = props
  const [ok, setOk] = useState(null)

  useEffect(() => {
    getExampleData(authToken).then(data => setOk(data.ok))
  }, [authToken])

  if (ok === null) {
    return <div />
  } else if (ok === false) {
    return <p>Something went wrong</p>
  } else {
    return <p>Everything is ok!</p>
  }
}
