import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";

interface Country {
  name: { common: string };
  capital: string[];
  area: number;
  languages: { [key: string]: string };
  flags: { png: string; svg: string };
}

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState("");
  const [showCountry, setShowCountry] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setShowCountry(null);
  };

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShow = (name: string) => setShowCountry(name);

  let content = null;
  if (filter === "") {
    content = <div>Type to search for countries.</div>;
  } else if (filtered.length > 10) {
    content = <div>Too many matches, specify another filter.</div>;
  } else if (filtered.length > 1) {
    content = (
      <ul>
        {filtered.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleShow(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else if (filtered.length === 1 || showCountry) {
    const country =
      filtered.length === 1
        ? filtered[0]
        : countries.find((c) => c.name.common === showCountry)!;
    content = (
      <div>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital?.[0]}</div>
        <div>Area: {country.area}</div>
        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages || {}).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" width={120} />
        {country.capital && <Weather city={country.capital[0]} />}
      </div>
    );
  } else {
    content = <div>No matches.</div>;
  }

  return (
    <div>
      <div>
        find countries: <input value={filter} onChange={handleFilterChange} />
      </div>
      {content}
    </div>
  );
};

export default App;
