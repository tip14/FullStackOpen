import { useState } from "react";
import axios from 'axios'
import CountriesSearch from "./components/CountriesSearch";
import FoundCountries from "./components/FoundCountries";


const App = () => {

  const [countrySearch, setCountrySearch] = useState('');
  const [foundCountries, setFoundCountries] = useState([]);

  const onCountrySearchChange = (event) => {
    const change = event.target.value;
    setCountrySearch(change);

    if (!change) {
      setFoundCountries([]);
      return;
    }

    axios.get(`https://restcountries.com/v3.1/name/${change}`)
      .then(response => {
        setFoundCountries(response.data)
      });
  };


  return (
    <div>
      <CountriesSearch onChange={onCountrySearchChange} search={countrySearch} />
      <FoundCountries countries={foundCountries} />
    </div>


  );
}

export default App;
