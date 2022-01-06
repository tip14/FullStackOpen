import {useDispatch} from "react-redux";
import {removeNotification, setNotification} from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = (anecdote) => {
        return {
            type: 'ADD',
            data: {
                anecdote
            }
        }
    }

    const add = (event) => {
        event.preventDefault()

        const newAnecdote = event.target.anecdote.value;
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`Added \'${newAnecdote}\' anecdote`))
        setTimeout(() => dispatch(removeNotification()), 5000)

        event.target.anecdote.value = ''

    }


    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}


export default AnecdoteForm