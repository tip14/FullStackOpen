import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog, token) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await axios.post(baseUrl, blog, {headers})
  return response.data
}

export default { getAll, createBlog }