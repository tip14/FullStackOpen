import React, {useEffect} from 'react'
import AnecdoteList from "./components/AnecdoteList";
import ConnectedNotification from "./components/Notification";
import ConnectedFilter from "./components/ConnectedFilter";
import {useDispatch} from "react-redux";
import {initAnecdotes} from "./reducers/anecdoteReducer";
import ConnectedAnecdoteForm from "./components/AnecdoteForm";

const App = () => {

    const dispatch = useDispatch()
    useEffect(() => dispatch(initAnecdotes()), [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <ConnectedFilter/>
            <ConnectedNotification/>
            <AnecdoteList/>
            <ConnectedAnecdoteForm/>
        </div>
    )
}

export default App