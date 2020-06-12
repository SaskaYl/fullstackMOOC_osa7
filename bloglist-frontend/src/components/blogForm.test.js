import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'
import { prettyDOM } from '@testing-library/dom'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#address')
  const form = component.container.querySelector('form')
  console.log(prettyDOM(title))
  console.log(prettyDOM(author))

  fireEvent.change(title, {
    target: { value: 'New test blog' }
  })
  console.log(prettyDOM(title))
  fireEvent.change(author, {
    target: { value: 'Tester' }
  })
  fireEvent.change(url, {
    target: { value: 'http://...' }
  })
  console.log(prettyDOM(form))
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('New test blog')
})