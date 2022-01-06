import {useDispatch, useSelector} from "react-redux";
import {removeNotification, setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch({type: 'VOTE', data: {id}})
        dispatch(setNotification(`You voted for \'${anecdotes.find(a => a.id === id).content}\'`))
        setTimeout(() => dispatch(removeNotification()), 5000)
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList