import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Testi Testaaja',
      url:'http://...',
      likes: 3
    }
    const user={
      name:'maija',
      id:123456
    }
    component = render(
      <Blog blog={blog} user={user}/>
    )
  })
  test('renders content', () => {
    component.debug()
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library Testi Testaaja'
    )
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    const blg = component.container.querySelector('blog')
    console.log(prettyDOM(blg))
    //   const element = component.getByText(
    //     'Component testing is done with react-testing-library'
    //   )
    //   expect(element).toBeDefined()
  })
  test('clicking the button viewMore shows more info', () => {
    const button = component.container.querySelector('button')
    console.log(prettyDOM(button))
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('http://...')
    expect(component.container).toHaveTextContent('likes')

  })
  test('clicking the button hide hides the xtra info', () => {
    const button = component.container.querySelector('button')
    console.log(prettyDOM(button))
    fireEvent.click(button)

    const closeButton = component.getByText('hide')
    console.log(prettyDOM(closeButton))
    fireEvent.click(closeButton)
    expect(component.container).not.toHaveTextContent('http://...')
  })
  test('clicking the like button calls eventhandler twice', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Testi Testaaja',
      url:'http://...',
      likes: 3
    }
    const user={
      name:'maija',
      id:123456
    }
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={user} increaseLikes={mockHandler}/>
    )
    const button = component.container.querySelector('button')
    console.log(prettyDOM(button))
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})