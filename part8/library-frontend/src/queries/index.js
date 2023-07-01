import {gql} from "@apollo/client";


const ALL_AUTHORS = gql`
    query {
        allAuthors  {
            name,
            born,
            bookCount
        }
    }
`

const ALL_BOOKS = gql`
    query {
        allBooks  {
            title,
            author,
            published
        }
    }
`
const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title,
            published,
            author,
            genres

        }
    }
`
const SET_BIRTHYEAR = gql`
    mutation setBirthYear($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name,
            born
        }
    }
`


export {ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, SET_BIRTHYEAR}