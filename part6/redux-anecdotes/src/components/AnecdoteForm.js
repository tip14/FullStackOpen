import {useDispatch} from "react-redux";

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

        dispatch(createAnecdote(event.target.anecdote.value))
        dispatch({
            type: 'SET_NOTIFICATION'
        })

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