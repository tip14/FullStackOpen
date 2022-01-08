import {useDispatch} from "react-redux";
import {removeNotification, setNotification} from "../reducers/notificationReducer"
import {createAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()



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