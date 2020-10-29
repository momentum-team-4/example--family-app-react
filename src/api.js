import axios from 'axios'
import { useState, useEffect } from 'react'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

export function useRemoteData (apiPromiseFn, config = {}) {
  let { dependencies, initialData } = config
  if (dependencies === undefined) {
    dependencies = []
  }

  const [data, setData] = useState(initialData)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const loadingFn = () => {
    setLoading(true)
    apiPromiseFn()
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }
  useEffect(loadingFn, dependencies)

  return [data, error, loading, loadingFn]
}

export function login (email, password) {
  return client.post('/auth/token/login/', {
    email: email,
    password: password
  })
    .then(res => res.data)
}

export function getWithAuth (token, url) {
  return client.get(url, {
    headers: {
      Authorization: 'Token ' + token
    }
  })
    .then(res => res.data)
}

export function getUserInfo (token) {
  return client.get('/auth/users/me/', {
    headers: {
      Authorization: 'Token ' + token
    }
  })
    .then(res => res.data)
}

export function getCircles (token) {
  return client.get('/circles/', {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function getCircle (token, pk) {
  return client.get(`/circles/${pk}/`, {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function getPosts (token, circlePk) {
  let url = '/posts/'
  if (circlePk) {
    url += '?circle=' + circlePk
  }
  return client.get(url, {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function createPost (token, body, circle) {
  return client.post('/posts/', {
    body: body,
    circle: circle
  }, {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function createCircle (token, name) {
  return client.post('/circles/', {
    name: name
  }, {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function addImageToPost (token, postUrl, image) {
  return client.put(postUrl + 'image/', image, {
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': image.type,
      'Content-Disposition': `attachment; filename=${image.name}`
    }
  }).then(res => res.data)
}
