import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import anecdoteReducer, {initAnecdotes} from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteService from "./services/anecdoteService";


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

anecdoteService.getAll().then(anecdotes => {
    store.dispatch(initAnecdotes(anecdotes))
})

const store = createStore(reducer, composeWithDevTools())

export default store