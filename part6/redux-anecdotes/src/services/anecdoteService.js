import axios from "axios";


const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const add = async (anecdoteText) => {
    const newAnecdote = {
        content: anecdoteText,
        id: getId(),
        votes: 0
    };
    const response = await axios.post(baseUrl,newAnecdote)

    return response.data
}

const vote = async (anecdote) => {
    const updateData = {
        ...anecdote,
        votes: ++anecdote.votes
    }

    const response = await axios.put(baseUrl + '/' + updateData.id, updateData)

    return response.data
}


export default {
    getAll,
    add,
    vote
}