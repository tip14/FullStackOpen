import axios from 'axios'

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

const add = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data);
}

const update = (updatedPerson) => {
    return axios.put(baseUrl + '/' + updatedPerson.id, updatedPerson).then(response => {
        return response.data;
    })
}


const remove = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`);
}

const exprt = {getAll, add, update, remove};

export default exprt;