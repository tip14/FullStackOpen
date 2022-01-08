import {connect} from "react-redux";
import {setNotification} from "../reducers/notificationReducer"
import {createAnecdote} from "../reducers/anecdoteReducer";

const doCreateAnecdote = content => createAnecdote(content);
const doSetNotification = content => setNotification(content);

const AnecdoteForm = (props) => {



    const add = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value;
        props.doCreateAnecdote(content)
        props.doSetNotification(`Added \'${content}\' anecdote`, 5)

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

const mapDispatchToProps = {
    doCreateAnecdote,
    doSetNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm