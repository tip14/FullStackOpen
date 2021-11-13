import Blog from '../../src/components/Blog'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

test('should render title and author', () => {
  const blog = {
    title: 'Blog Title',
    url: 'https://website.com',
    author: 'Billy Comp',
    likes:5
  }
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(`${blog.title}`)
  expect(component.container).toHaveTextContent(`${blog.author}`)
  expect(component.container).not.toHaveTextContent(`${blog.likes}`)
  expect(component.container).not.toHaveTextContent(`${blog.url}`)

})

test('should show all blog details after click', () => {
  const blog = {
    title: 'Blog Title',
    url: 'https://website.com',
    author: 'Billy Comp',
    likes:5,
    user: {
      username: 'blogauthor'
    }
  }


  const component = render(
    <Blog blog={blog} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(`${blog.likes}`)
  expect(component.container).toHaveTextContent(`${blog.url}`)

})

test('should recieve two cliks on like button', () => {
  const blog = {
    title: 'Blog Title',
    url: 'https://website.com',
    author: 'Billy Comp',
    likes:5,
    user: {
      username: 'blogauthor'
    }
  }

  const mockAddLike = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockAddLike}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const addLikeButton = component.container.querySelector('.add_like')
  fireEvent.click(addLikeButton)
  fireEvent.click(addLikeButton)

  expect(mockAddLike.mock.calls).toHaveLength(2)

})