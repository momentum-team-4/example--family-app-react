import axios from 'axios'

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
