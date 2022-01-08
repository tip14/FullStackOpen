import {useDispatch} from "react-redux";
import {setNotification} from "../reducers/notificationReducer"
import {createAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()



    const add = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value;
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Added \'${content}\' anecdote`, 5))

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