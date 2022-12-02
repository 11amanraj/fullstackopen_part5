import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (obj) => {
  const config = {
    headers: { Authorization: obj.token }
  }
  const response = await axios.post(baseUrl, obj.blog, config)
  return response.data
}

const blogService = { getAll, createNew }

export default blogService