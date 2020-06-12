
import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div className='formDiv'>
      <Form onSubmit={addBlog}>
        <Form.Group >
          <br/>
          <Form.Row>
            <Form.Label column sm='1'>Blog&apos;s title:</Form.Label>
            <Col sm='4'>
              <Form.Control
                id='title'
                value={newTitle}
                name="Title"
                onChange={handleTitleChange}
              />
            </Col ></Form.Row>
          <br />
          <Form.Row>
            <Form.Label column sm='1'>Author:</Form.Label>
            <Col sm='4'>
              <Form.Control
                id='author'
                value={newAuthor}
                name='Author'
                onChange={handleAuthorChange}
              /></Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column sm='1'>Address:</Form.Label>
            <Col sm='4'>
              <Form.Control
                id='address'
                value={newUrl}
                name='Address'
                onChange={handleUrlChange}
              /></Col>
          </Form.Row>
          <br/>
          <Button variant='outline-dark' size='lg' style={{ color:'#FF0077' }}id='addBlog' type="submit">add</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default BlogForm