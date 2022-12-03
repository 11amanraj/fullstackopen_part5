import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, user, onUpdate}) => {
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
      const updatedBlog = await blogService.updateBlog({blog, user})
      onUpdate(updatedBlog)
    } catch(error) {
      console.log(error)
    }
  }

  // console.log(blog)

  // console.log(blog.id)

  return (
    <div style={blogStyle}> 
      {blog.title} by {blog.author} <button onClick={detailDisplayHandler}>{showDetail ? 'hide' : 'show'}</button>
      {showDetail && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}<button onClick={updateBlogHandler}>like</button></p>
          {/* earlier blogs do not have users, remove blog.user check after adding delete functionality */}
          {blog.user && <p>{blog.user.name}</p>}
        </div>
      )}
    </div>
  )  
}

export default Blog