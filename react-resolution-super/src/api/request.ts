import axios from 'axios'

const API_ENDPOINT = process.env.ENDPOINT
  ? process.env.ENDPOINT
  : ' http://localhost:5000'

export function apiRequest() {
  const headers = {
    'Content-Type': 'application/json',
  }
  return axios.create({
    baseURL: API_ENDPOINT,
    headers: headers,
  })
}
