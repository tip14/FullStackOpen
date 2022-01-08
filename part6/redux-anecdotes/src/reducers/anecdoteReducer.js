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
                return action.data
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

export const createAnecdote = (anecdoteText) => {
    return async dispatch => {
        const added = await anecdoteService.add(anecdoteText)
        dispatch({
            type: 'ADD',
            data: added
        })
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

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.vote(anecdote);
        console.log('vote resp', votedAnecdote)
        dispatch({
                type: 'VOTE',
                data: votedAnecdote
            }
        )
    }
}

export default anecdoteReducer