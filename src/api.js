import axios from 'axios'
import { useState, useEffect } from 'react'

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
  return axios.post('http://127.0.0.1:8000/auth/token/login/', {
    email: email,
    password: password
  })
    .then(res => res.data)
}

export function getUserInfo (token) {
  return axios.get('http://127.0.0.1:8000/auth/users/me/', {
    headers: {
      Authorization: 'Token ' + token
    }
  })
    .then(res => res.data)
}

export function getExampleData (token) {
  return axios.get('http://127.0.0.1:8000/example/', {
    headers: {
      Authorization: 'Token ' + token
    }
  })
    .then(res => res.data)
}

export function getCircles (token) {
  return axios.get('http://127.0.0.1:8000/circles/', {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function getPosts (token) {
  return axios.get('http://127.0.0.1:8000/posts/', {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function createPost (token, body, circle) {
  return axios.post('http://127.0.0.1:8000/posts/', {
    body: body,
    circle: circle
  }, {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function createCircle (token, name) {
  return axios.post('http://127.0.0.1:8000/circles/', {
    name: name
  }, {
    headers: {
      Authorization: 'Token ' + token
    }
  }).then(res => res.data)
}

export function addImageToPost (token, postUrl, image) {
  return axios.put(postUrl + 'image/', image, {
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': image.type,
      'Content-Disposition': `attachment; filename=${image.name}`
    }
  }).then(res => res.data)
}
