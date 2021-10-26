const CountriesSearch = ({onChange, search}) => {
    return <p>find countries <input type="text" onChange={onChange} value={search} /></p>
}

export default CountriesSearch;