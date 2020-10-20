import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={createBlog}
      />
    )
  })

  test('form calls its callback function with right information', () => {
    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'A tour of Go' }
    })

    fireEvent.change(author, {
      target: { value: 'The golang team' }
    })

    fireEvent.change(url, {
      target: { value: 'https://tour.golang.org/welcome/1' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('A tour of Go')
    expect(createBlog.mock.calls[0][0].author).toBe('The golang team')
    expect(createBlog.mock.calls[0][0].url).toBe('https://tour.golang.org/welcome/1')
  })
})