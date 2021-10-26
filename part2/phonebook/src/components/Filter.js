const Filter = ({onFilterNameChange, filterName}) => {
    return <p>filter shown with <input onChange={onFilterNameChange} value={filterName} /></p>
}

export default Filter;