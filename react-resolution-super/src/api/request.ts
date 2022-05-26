import axios from 'axios'

export const API_ENDPOINT = process.env.ENDPOINT
  ? process.env.ENDPOINT
  : ' http://127.0.0.1:5000'

export function apiRequest(token?: string) {
  let headers
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      authorization: token,
    }
  } else {
    headers = {
      'Content-Type': 'application/json',
    }
  }
  return axios.create({
    baseURL: API_ENDPOINT,
    headers: headers,
  })
}

export function apiRequestFile(token?: string) {
  let headers
  if (token) {
    headers = {
      'Content-Type': 'multipart/form-data',
      authorization: token,
    }
  } else {
    headers = {
      'Content-Type': 'multipart/form-data',
    }
  }
  return axios.create({
    baseURL: API_ENDPOINT,
    headers: headers,
  })
}
