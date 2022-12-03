import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import './App.css'
import NewBlog from './components/NewBlog'

const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const blogUpdateHandler = (updatedBlog) => {
    const idList = blogs.map(blog => blog.id)
    const index = idList.indexOf(updatedBlog.id)
 
    const newBlogs = [...blogs]
    newBlogs[index].likes += 1
    setBlogs(newBlogs)
  }

  const blogSubmitHandler = (newBlog) => setBlogs(prev => [...prev, newBlog])
  const blogDeleteHandler = (deletedBlogID) => setBlogs(prev => prev.filter(blog => blog.id !== deletedBlogID))
  const messageHandler = (message) => setMessage(message)

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        {message && <div className={message.type}>{message.message}</div>}
        <h3>{`${user.name} logged in`} <button onClick={logoutHandler}>Log out</button></h3>
        <NewBlog user={user} onSubmit={blogSubmitHandler} messageHandler={messageHandler}/>
        <div>
          {blogs.sort((a,b) => a.likes < b.likes ? 1 : -1)
                .map(blog =>
                  <Blog onUpdate={blogUpdateHandler} onDelete={blogDeleteHandler} onMessage={messageHandler} user={user} key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        {message && <div className={message.type}>{message.message}</div>}
        <LoginForm onSubmit={loginHandler} onError={messageHandler}/>
      </div>
    )
  }

}

export default App
