import axios from 'axios'

export const API_ENDPOINT = process.env.ENDPOINT
  ? process.env.ENDPOINT
  : ' http://localhost:5000'

export function apiRequest(token?: string) {
  let headers
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: token,
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
      apiKey: token,
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
