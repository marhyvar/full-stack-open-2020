const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithSimilarLikes = [
  {
    title: 'React v16.9.0 and the Roadmap Update',
    author: 'Dan Abramov and Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/08/react-v16.9.0.html',
    likes: 10,
    id: '5f1d7aaece57cc31088ea5f6'
  },
  {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
    likes: 2,
    id: '5f1d771564132925f8b95eff'
  },
  {
    title: 'React v16.8: The One With Hooks',
    author: 'Dan Abramov',
    url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html',
    likes: 10,
    id: '5f1d7d14401b5a0b4ce325ad'
  }
]

const biggerList = [
  {
    title: 'Building Great User Experience',
    author: 'Joseph Savona',
    url: 'https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html',
    likes: 0,
    id: '5f1d7122cc70302830a288ee'
  },
  {
    title: 'React v16.13.0',
    author: 'Sunil Pai',
    url: 'https://reactjs.org/blog/2020/02/26/react-v16.13.0.html',
    likes: 1,
    id: '5f1d71eb7de1a0045ce80a0f'
  },
  {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
    likes: 2,
    id: '5f1d771564132925f8b95eff'
  },
  {
    title: 'React v16.9.0 and the Roadmap Update',
    author: 'Dan Abramov and Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/08/react-v16.9.0.html',
    likes: 3,
    id: '5f1d7aaece57cc31088ea5f6'
  },
  {
    title: 'React v16.8: The One With Hooks',
    author: 'Dan Abramov',
    url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html',
    likes: 10,
    id: '5f1d7d14401b5a0b4ce325ad'
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  const testList = (array, expectedResult) => {
    const result = listHelper.totalLikes(array)
    expect(result).toBe(expectedResult)
  }

  test('of empty list is zero', () => {
    testList(emptyList, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    testList(listWithOneBlog, 5)
  })

  test('of a bigger list is calculated right', () => {
    testList(biggerList, 16)
  })

})

describe('favorite blog', () => {

  const testFavorite = (array, expectedResult) => {
    expect(listHelper.favoriteBlog(array)).toEqual(expectedResult)
  }

  test('of an empty list returns zero', () => {
    expect(listHelper.favoriteBlog(emptyList)).toEqual(0)
  })

  test('of a list with one blog returns the likes of that', () => {
    const favorite =   {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    testFavorite(listWithOneBlog, favorite)
  })

  test('of a bigger list calculates the likes right', () => {
    const favorite = {
      title: 'React v16.8: The One With Hooks',
      author: 'Dan Abramov',
      likes: 10
    }
    testFavorite(biggerList, favorite)
  })

  test('of a list with similar likes returns one blog (most recent addition)', () => {
    const favorite = {
      title: 'React v16.8: The One With Hooks',
      author: 'Dan Abramov',
      likes: 10
    }
    testFavorite(listWithSimilarLikes, favorite)
  })

})