import anecdoteService from "../services/anecdoteService";

const sortByVotesDesc = (first, second) => {

    if (first.votes > second.votes) {
        return -1
    }

    if (first.votes < second.votes) {
        return 1
    }

    return 0
}

const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    let newState;

    if (action.type === 'VOTE') {
        newState = state.map(a => {
            if (a.id === action.data.id) {
                a.votes = ++a.votes
            }

            return a
        })
    } else if (action.type === 'ADD') {
        newState = state.concat((action.data));
    } else if (action.type === 'INIT') {
        newState = action.data
    } else {
        newState = state
    }

    return newState.sort(sortByVotesDesc);
}

export const createAnecdote = (anecdote) => {
    return {
        type: 'ADD',
        data: anecdote
    }
}

export const initAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }
}

export default anecdoteReducer