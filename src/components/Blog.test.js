import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'


test('only title and author are rendered', () => {
  const blog = {
    title: 'Realm of Elderlings',
    author: 'Robin Hobb',
    url: 'www.elderlings.com',
    likes: 50,
    id: 4565,
    user: {
      id: 8945,
      name: 'Wagatha',
      username: 'christie',
    }
  }

  render(<Blog blog={blog} />)

  const elementTitle = screen.getByText('Realm of Elderlings by Robin Hobb')
  expect(elementTitle).toBeDefined()

  const urlElement = screen.queryByText('www.elderlings.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText(50)
  expect(likesElement).toBeNull()
})

test('likes and url are rendered when button is clicked', async () => {
  const blog = {
    title: 'Realm of Elderlings',
    author: 'Robin Hobb',
    url: 'www.elderlings.com',
    likes: 50,
    id: 4565,
    user: {
      id: 8945,
      name: 'Wagatha',
      username: 'christie',
    }
  }

  const userID = {
    id: 8945,
    name: 'Wagatha',
    username: 'christie',
  }

  render(<Blog blog={blog} user={userID}/>)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const elementTitle = screen.getByText('Realm of Elderlings by Robin Hobb')
  expect(elementTitle).toBeDefined()

  const urlElement = screen.queryByText('www.elderlings.com')
  expect(urlElement).toBeDefined()

  const likesElement = screen.queryByText(50)
  expect(likesElement).toBeDefined()
})

test('clicking likes button twice execute onUpdate twice', async () => {
  const blog = {
    title: 'Realm of Elderlings',
    author: 'Robin Hobb',
    url: 'www.elderlings.com',
    likes: 50,
    id: 4565,
    user: {
      id: 8945,
      name: 'Wagatha',
      username: 'christie',
    }
  }

  const userID = {
    id: 8945,
    name: 'Wagatha',
    username: 'christie',
  }

  const mockHandler = jest.fn()
  blogService.updateBlog = jest.fn()

  const { container } = render(<Blog blog={blog} user={userID} onUpdate={mockHandler}/>)

  const user = userEvent.setup()
  const btn1 = screen.getByText('show')
  await user.click(btn1)
  const btn2 = container.querySelector('.btn2')
  await user.click(btn2)
  await user.click(btn2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})