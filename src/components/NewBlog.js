import { useState } from "react";
import blogService from '../services/blogs'

const NewBlog = (props) => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogSubmitHandler = async e => {
        e.preventDefault()
        try {
          const token = `bearer ${props.user}`
          const blog = {
            title: title,
            author: author,
            url: url,
            likes: 15000
          }
          const newBlog = await blogService.createNew({blog,token})
          props.onSubmit(newBlog)
          setAuthor('')
          setTitle('')
          setUrl('')
          props.messageHandler({type: 'success', message: `${blog.title} by ${blog.author} added`})
        } catch(error) {
          props.messageHandler({type: 'error', message: error.response.data.error})
        }
      }

    const newBlogButton = () => {
        return (
            <button onClick={() => setShowForm(true)}>new blog</button>
        )
    }

    const blogForm = () => {
        return (
            <form onSubmit={blogSubmitHandler}>
            <h2>create new blog</h2>
            <div>
                <label>title</label>
                <input value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div>
                <label>author</label>
                <input value={author} onChange={e => setAuthor(e.target.value)}></input>
            </div>
            <div>
                <label>url</label>
                <input value={url} onChange={e => setUrl(e.target.value)}></input>
            </div>
            <button type='submit'>Create Blog</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        )
    }

    return ( 
        <div>
            {
                showForm ? blogForm()
                        : newBlogButton()
            }
        </div>
     );
}
 
export default NewBlog;