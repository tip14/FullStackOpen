import { useState } from "react";
import ShowHideButton from "./ShowHideButton";
import Weather from "./Weather";

const FoundCountries = ({ countries }) => {

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return (
            <>
                {countries.map(c => <Country country={c} key={c.name.common} />)}
            </>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} show={true}/>
        )
    }

    return <></>;
}

const Country = ({ country, show }) => {

    const [showDetails, setShowDetails] = useState(show);

    const toggleDetails = (event) => {
        event.preventDefault();
        setShowDetails(!showDetails);
    }

    if (showDetails) {
        return (
            <>
                <h2>{country.name.common} <ShowHideButton onButtonClick={toggleDetails} text="hide"/></h2>
                <p>capital {country.capital[0]}</p>
                <p>population {country.population}</p>
                <h3>Spoken languages</h3>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
                <br />
                <img src={country.flags.png} alt="flag" />
                <Weather city={country.capital[0]} />
            </>
        )
    } else {
        return <p>{country.name.common} <ShowHideButton onButtonClick={toggleDetails} text="show"/></p>
    }
}


export default FoundCountries;