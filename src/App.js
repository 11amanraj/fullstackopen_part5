import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [message, setMessage] = useState(null)
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

  useEffect(() => {
    if(message) {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
      return () => clearTimeout(setTimeout(() => {
        setMessage(null)
      }, 5000))
    }
  }, [message])

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser()
  }

  const loginHandler = (user) => {
    window.localStorage.setItem('loggeduser', JSON.stringify(user))
    setUser(user)
  }

  const loginErrorHandler = (errorObj) => {
    setMessage(errorObj)
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
      setMessage({type: 'success', message: `${blog.title} by ${blog.author} added`})
    } catch(error) {
      setMessage({type: 'error', message: error.response.data.error})
      // console.log(error.response.data.error)
    }
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        {message && <div className={message.type}>{message.message}</div>}
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
        {message && <div className={message.type}>{message.message}</div>}
        <LoginForm onSubmit={loginHandler} onError={loginErrorHandler}/>
      </div>
    )
  }

}

export default App
