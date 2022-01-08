import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../reducers/notificationReducer";
import {voteAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {

        if (state.filter) {
            return state.anecdotes.filter(a => a.content.includes(state.filter))
        }

        return state.anecdotes;
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted for \'${anecdotes.find(a => a.id === anecdote.id).content}\'`, 5))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList