const initialState = ''

const filterReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    if (action.type === 'FILTER') {
        return action.data.filterString
    }

    return state
}

export default filterReducer