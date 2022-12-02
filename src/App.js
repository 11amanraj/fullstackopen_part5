import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
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

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser()
  }

  const loginHandler = (user) => {
    window.localStorage.setItem('loggeduser', JSON.stringify(user))
    setUser(user)
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{`${user.name} logged in`} <button onClick={logoutHandler}>Log out</button></h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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
