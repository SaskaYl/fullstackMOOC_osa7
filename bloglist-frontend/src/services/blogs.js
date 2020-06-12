import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
const postComment = (id, newObject) => {
  const config = {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  }
  return axios.post(`${baseUrl}/${id}/comments`, newObject, config)
}
const remove=(id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll, getOne, create, update, remove, setToken, postComment
}