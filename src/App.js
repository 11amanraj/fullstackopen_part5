import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginHandler = loginObj => {
    setLoggedIn(loginObj.status)
    setName(loginObj.name)
  }

  if (loggedIn) {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{`${name} logged in`}</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  } else {
    return (
      <div>
        <LoginForm loginHandler={loginHandler}/>
      </div>
    )
  }

}

export default App
