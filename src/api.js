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
