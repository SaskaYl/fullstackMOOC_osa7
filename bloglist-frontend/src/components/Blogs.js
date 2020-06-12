import React from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from './blogForm'
import Togglable from './togglable'
import { createAction } from '../reducers/blogsReducer'
import { Table } from 'react-bootstrap'

const Blogs=({ blogs, user }) => {
  const blogFormRef = React.createRef()
  const dispatch=useDispatch()
  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createAction(newBlog, user))
  }
  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Table striped borderless hover variant='dark' responsive style={{ width:'70%', marginTop: '10px' }}><tbody>
        {blogs.map(blog =>
          <tr key={blog.id}><Blog id='blogList' key={blog.id} blog={blog}/></tr> )}
      </tbody>
      </Table>
    </>
  )
}
export default Blogs