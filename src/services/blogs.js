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

const updateBlog = async (obj) => {
  const config = {
    headers: { Authorization: `bearer ${obj.user.token}` }
  }

  const blog = {
    user: obj.blog.user.id,
    likes: obj.blog.likes+1,
    author: obj.blog.author,
    title: obj.blog.title,
    url: obj.blog.url
  }

  const response = await axios.put(`${baseUrl}/${obj.blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async (obj) => {
  const config = {
    headers: { Authorization: `bearer ${obj.user.token}` }
  }

  const response = await axios.delete(`${baseUrl}/${obj.blog.id}`, config)
  return response.status
}

const blogService = { getAll, createNew, updateBlog, deleteBlog }

export default blogService