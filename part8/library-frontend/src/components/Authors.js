import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, SET_BIRTHYEAR} from "../queries";
import {useState} from "react";

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading authors...</div>
  }

  const authors = [...result.data.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

        <SetBirthYear authors={authors.map(a => a.name)}/>
    </div>
  )
}

const SetBirthYear = (props) => {

    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const onBornChange = (e) => setBorn(e.target.value)
    const onNameChange = (e) => setName(e.target.value)
    const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [{query: ALL_AUTHORS}]
    })
    const onSubmit = (e) => {
        e.preventDefault()

        setBirthYear({variables: {name, setBornTo: Number(born)}})

        setBorn('')
        setName('')
    }


    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={onSubmit}>
            <div>
                name
                <select type={"text"} onChange={onNameChange}>
                    {props.authors.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>
            <div>
                born
                <input type={"number"} value={born} onChange={onBornChange}/>
            </div>
            <div>
                <button type={"submit"}>update author</button>
            </div>
        </form>
      </div>
  )
}

export default Authors
