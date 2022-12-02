import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggeduser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser()
  }

  const loginHandler = (user) => {
    window.localStorage.setItem('loggeduser', JSON.stringify(user))
    setUser(user)
  }

  const blogSubmitHandler = async e => {
    e.preventDefault()
    try {
      const token = `bearer ${user.token}`
      const blog = {
        title: title,
        author: author,
        url: url,
        likes: 15000
      }
      const newBlog = await blogService.createNew({blog,token})
      setBlogs(prev => [...prev, newBlog])
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch(error) {
      console.log(error.response.data.error)
    }
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{`${user.name} logged in`} <button onClick={logoutHandler}>Log out</button></h3>
        
        <form onSubmit={blogSubmitHandler}>
          <h2>create new blog</h2>
          <div>
            <label>title</label>
            <input onChange={e => setTitle(e.target.value)}></input>
          </div>
          <div>
            <label>author</label>
            <input onChange={e => setAuthor(e.target.value)}></input>
          </div>
          <div>
            <label>url</label>
            <input onChange={e => setUrl(e.target.value)}></input>
          </div>
          <button type='submit'>Create Blog</button>
        </form>
        
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <LoginForm onSubmit={loginHandler}/>
      </div>
    )
  }

}

export default App
