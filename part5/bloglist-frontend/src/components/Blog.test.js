import Blog from '../../src/components/Blog'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from "./CreateBlog";

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

test('should receive two clicks on the like button', () => {
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

test('should correctly pass data to the new blog form event handler', () => {

  const mockSaveBlog = jest.fn()

  const component = render(
      <CreateBlog saveBlog={mockSaveBlog} />
  )

  //fill form
  const author = "Bob White"
  const title = "How to test forms?"
  const url = "http://howtotestforms.com"

  const authorInForm = component.getByTestId('author');
  const titleInForm = component.getByTestId('title');
  const urlInForm = component.getByTestId('url');

  fireEvent.change(authorInForm, {
    target: {
      value: author
    }
  })

  fireEvent.change(titleInForm, {
    target: {
      value: title
    }
  })

  fireEvent.change(urlInForm, {
    target: {
      value: url
    }
  })


  const submitButton = component.getByText('create')
  fireEvent.click(submitButton)

  expect(mockSaveBlog.mock.calls).toHaveLength(1)

  //[0][0] The first argument of the first call
  expect(mockSaveBlog.mock.calls[0][0].title).toBe(title)
  expect(mockSaveBlog.mock.calls[0][0].author).toBe(author)
  expect(mockSaveBlog.mock.calls[0][0].url).toBe(url)



})