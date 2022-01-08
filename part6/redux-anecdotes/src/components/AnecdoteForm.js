import {useDispatch} from "react-redux";
import {removeNotification, setNotification} from "../reducers/notificationReducer"
import {createAnecdote} from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {

    const dispatch = useDispatch()



    const add = async (event) => {
        event.preventDefault()

        const newAnecdote = event.target.anecdote.value;

        const added = await anecdoteService.add(newAnecdote)

        dispatch(createAnecdote(added))
        dispatch(setNotification(`Added \'${added.content}\' anecdote`))
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