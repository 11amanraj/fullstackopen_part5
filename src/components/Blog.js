import { useState } from 'react'
import blogService from '../services/blogs'
// import PropTypes from 'prop-types'

const Blog = ({ blog, user, onUpdate, onMessage, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false)

  const detailDisplayHandler = () => {
    if(showDetail === false) setShowDetail(true)
    if(showDetail === true) setShowDetail(false)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlogHandler = async () => {
    try {
      const updatedBlog = await blogService.updateBlog({ blog, user })
      onUpdate(updatedBlog)
    } catch(error) {
      console.log(error)
    }
  }

  const deleteHandler = async () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}`)){
      try {
        await blogService.deleteBlog({ blog, user })
        onDelete(blog.id)
        onMessage({ type: 'success', message: `${blog.title} by ${blog.author} deleted` })
        // console.log('deleted')
      } catch(error) {
        console.log(error)
      }
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button id='show-detail' onClick={detailDisplayHandler}>{showDetail ? 'hide' : 'show'}</button>
      {showDetail && (
        <div>
          <p>{blog.url}</p>
          <p id='likes'>{blog.likes}<button className='btn2' onClick={updateBlogHandler}>like</button></p>
          <p>{blog.user.name}</p>
          {(blog.user.username === user.username) && <button id='delete-blog' onClick={deleteHandler}>DELETE</button>}
        </div>
      )}
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   onMessage: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired
// }

export default Blog