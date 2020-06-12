import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeAction, removeAction, commentAction } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BlogDetails=({ blogs, user }) => {
  const [comment, setComment]=useState('')
  const dispatch= useDispatch()
  const increaseLikes=async() => {
    dispatch(likeAction(blog))
  }
  const removeBlog=async() => {
    if (window.confirm(`Are you sure You want to delete ${blog.title} ?`)){
      dispatch(removeAction(blog))
    }
  }
  const id= useParams().id
  const blog= blogs.find(b => b.id===id)
  if (!blog) {
    return null
  }
  const handleChange=(event) => {
    console.log(event.target.value)
    setComment(event.target.value)
  }
  const sendComment=(event) => {
    console.log(comment, 'sendcomment')
    dispatch(commentAction(blog, comment))
    setComment('')
  }
  return(
    <div className='blog'>
      <p>{blog.title} by {blog.author}</p>
      <a href={blog.url} style={{ color:'#605050' }}>{blog.url}</a>
      <p style={{ marginTop:'15px' }}>likes: {blog.likes} <Button variant='outline-dark' style={{ color:'#FF0077' }} size='sm' id='like-button' onClick={increaseLikes}>like</Button></p>
      <p id='blogsUserName'>added by {blog.user.name}</p>
      {blog.user.id===user.id&& <Button variant='dark' size='sm' style={{ color:'#000000' }}id='remove-button' onClick={() => removeBlog()}>delete blog</Button>}
      <h3 style={{ marginTop:'20px' }}>Comments</h3>
      <div> <textarea className='commentbox' value={comment} onChange={handleChange}/></div>
      <Button variant='dark' style={{ color:'#66ff00' }}onClick={sendComment}>add comment</Button>
      <ul>
        {blog.comments.map(c => <li key={c._id} style={{ marginTop:'7px' }}>{c.comment}</li>)}
      </ul>
    </div>
  )
}
export default BlogDetails