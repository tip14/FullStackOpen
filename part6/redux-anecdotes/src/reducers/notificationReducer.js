const initialState = {
    message: '',
    timeoutId: null
}

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    if (action.type === 'SET_NOTIFICATION') {
        if (state.timeoutId) {
            clearTimeout(state.timeoutId)
        }
        return action.data;
    }

    return state
}

export const setNotification = (message, timeout) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => dispatch(removeNotification()), timeout * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                timeoutId
            }
        })

    }
}

export const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            message: ''
        }
    }
}

export default notificationReducer