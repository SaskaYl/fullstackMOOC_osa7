import React from 'react'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <>
      <td style={{ width:'500px' }}><Link to={`/blogs/${blog.id}`}style={{ color:'#66ff00' }}>{blog.title}</Link></td><td  style={{ textAlign:'left', width:'300px', color:'#877' }}>by {blog.author}</td>
    </>
  )}

export default Blog
