import axios from 'axios'

const dbUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    return axios.get(dbUrl).then(response => response.data);
}

const add = (newPerson) => {
    return axios.post(dbUrl, newPerson).then(response => response.data);
}

const update = (updatedPerson) => {
    return axios.put(dbUrl + '/' + updatedPerson.id, updatedPerson).then(response => {
        return response.data;
    })
}


const remove = (personId) => {
    return axios.delete(`${dbUrl}/${personId}`);
}

const exprt = {getAll, add, update, remove};

export default exprt;