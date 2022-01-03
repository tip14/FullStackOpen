const initialState = ''

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    if (action.type === 'SET_NOTIFICATION') {
        return 'Notif message'
    }

    return state
}

export default notificationReducer