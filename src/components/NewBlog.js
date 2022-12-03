import { useState } from "react";
import blogService from '../services/blogs'
import PropTypes from 'prop-types';

const NewBlog = ({user, onSubmit, messageHandler}) => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogSubmitHandler = async e => {
        e.preventDefault()
        try {
          const token = `bearer ${user.token}`
          const blog = {
            title: title,
            author: author,
            url: url,
          }
          const newBlog = await blogService.createNew({blog,token})
          onSubmit({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes,
            id: newBlog.id,
            user: {
                id: newBlog.user,
                name: user.name,
                username: user.username,
            }
          })
          setAuthor('')
          setTitle('')
          setUrl('')
          messageHandler({type: 'success', message: `${blog.title} by ${blog.author} added`})
        } catch(error) {
          messageHandler({type: 'error', message: error.response.data.error})
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

NewBlog.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired, 
    messageHandler: PropTypes.func.isRequired
}
 
export default NewBlog;