const initialNofication = 'You can vote for your favorite anecdotes \
or add new anecdotes to the list!'

const notificationReducer = (state = initialNofication, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const notify = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export default notificationReducer