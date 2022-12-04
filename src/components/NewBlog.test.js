import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'
import blogService from '../services/blogs'

test('NewBlog component working correctly', async () => {
  const userID = {
    id: 8945,
    name: 'Wagatha',
    username: 'christie',
    token: 56465478
  }

  //mocks all the imported functions
  blogService.createNew = jest.fn().mockReturnValue({
    title: 'Way of Kings',
    author: 'Brandon Sanderson',
    url: 'www.cosmere.com',
    likes: 0,
    id: 465456,
    user: userID.id,
  })
  const onSubmit = jest.fn()
  const messageHandler = jest.fn()

  //render the component
  render(<NewBlog user={userID} onSubmit={onSubmit} messageHandler={messageHandler}/>)
  const user = userEvent.setup()
  //open the form
  const newBlogButton = screen.getByText('new blog')
  await user.click(newBlogButton)

  //get all test elements
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const createBlog = screen.getByText('Create Blog')

  //mock all user interactions
  await user.type(titleInput, 'Way of Kings')
  await user.type(authorInput, 'Brandon Sanderson')
  await user.type(urlInput, 'www.cosmere.com')
  await user.click(createBlog)

  expect(onSubmit.mock.calls).toHaveLength(1)
  expect(messageHandler.mock.calls).toHaveLength(1)
})