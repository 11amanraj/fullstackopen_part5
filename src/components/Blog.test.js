import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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