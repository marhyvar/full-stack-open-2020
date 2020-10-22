import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const expectedResult = {
      good: 0,
      ok: 1,
      bad: 0
    }
    testIncrement(initialState, 'OK', expectedResult)
  })

  test('bad is incremented', () => {
    const expectedResult = {
      good: 0,
      ok: 0,
      bad: 1
    }
    testIncrement(initialState, 'BAD', expectedResult)
  })

  test('all values are set to zero', () => {
    const anotherState = {
      good: 5,
      ok: 7,
      bad: 3
    }
    
    const expectedResult = {
      good: 0,
      ok: 0,
      bad: 0
    }

    testIncrement(anotherState, 'ZERO', expectedResult)
  })
})

const testIncrement = (initialState, actionType, result) => {
  const action = {
    type: actionType
  }
  const state = initialState

  deepFreeze(state)
  const newState = counterReducer(state, action)
  expect(newState).toEqual(result)
}