const initialState = ''

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    if (action.type === 'SET_NOTIFICATION') {
        return action.data.msg
    }

    return state
}

export const setNotification = (msg, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                msg
            }
        })
        setTimeout(() => dispatch(removeNotification()), timeout * 1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            msg: ''
        }
    }
}

export default notificationReducer