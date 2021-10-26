import personService from '../services/persons';


const PersonEntry = ({ data, onRemove }) => {
    const deletePerson = () => {
        const deleteConfirmed = window.confirm(`Delete ${data.name}?`);
        if (deleteConfirmed) {
            personService.remove(data.id).then(() => onRemove(data.id));
        }
    };
    return (
        <>
            <p>{data.name} {data.number} <button onClick={deletePerson}>delete</button></p>
        </>
    )
}



const Persons = ({ persons, filterName, onRemove }) => {
    const filterNumberForDisplay = person => person.name.startsWith(filterName);
    const mapNumberForDisplay = person => <PersonEntry data={person} key={person.name} onRemove={onRemove} />;

    return (
        <>
            {persons.filter(filterNumberForDisplay).map(mapNumberForDisplay)}
        </>
    )
}



export default Persons;