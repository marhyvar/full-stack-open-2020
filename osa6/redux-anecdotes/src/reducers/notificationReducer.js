const initialNofication = 
  'You can vote for your favorite anecdotes or add new anecdotes to the list!'

const notificationReducer = (state = initialNofication, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('notify')
      return action.notification
    case 'CLEAR_NOTIFICATION':
      console.log('clear')
      return ''
    default:
      return state
  }
}

export const notify = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
  }
}

export const clearNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_NOTIFICATION'
    })
  }
}

export const notifyWithTime = (notification, time) => {
  return async dispatch => {
    dispatch(notify(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationReducer