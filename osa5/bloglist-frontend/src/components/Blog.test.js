import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Testing React applications',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
    likes: 10,
    user: {
      name: 'John Doe',
      username: 'admin'
    }
  }

  const user = {
    name: 'John Doe',
    username: 'admin'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('in the beginning title and author are visible', () => {
    const div = component.container.querySelector('.lessInfo')

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'Testing React applications'
    )
    expect(div).toHaveTextContent(
      'Matti Luukkainen'
    )
  })

  test('in the beginning url and likes are not visible', () => {
    const div = component.container.querySelector('.moreInfo')

    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
    )
    expect(div).toHaveTextContent(
      10
    )
  })

  test('after clicking the button, full info is shown', () => {
    const div1 = component.container.querySelector('.lessInfo')
    const div2 = component.container.querySelector('.moreInfo')
    const button = component.getByText('view')

    fireEvent.click(button)
    expect(div1).toHaveStyle('display: none')
    expect(div2).not.toHaveStyle('display: none')
    expect(div2).toHaveTextContent(
      'Testing React applications'
    )
    expect(div2).toHaveTextContent(
      'Matti Luukkainen'
    )
    expect(div2).toHaveTextContent(
      'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
    )
    expect(div2).toHaveTextContent(
      10
    )
  })

})
