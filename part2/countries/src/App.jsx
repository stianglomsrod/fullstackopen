import { useState, useEffect } from "react";
import helpers from "./services/helpers";
import CountryName from "./components/CountryName";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    helpers.getAll().then((countriesArr) => {
      setCountries(countriesArr);
    });
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;

    setSearchFilter(newFilter);

    console.log(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase()),
      ),
    );
  };

  const countriesToShow = countries
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchFilter.toLowerCase()),
      )
    : [];

  return (
    <>
      <div>
        find countries{" "}
        <input value={searchFilter} onChange={handleFilterChange} />
      </div>

      {searchFilter === "" ? null : countriesToShow.length === 1 ? (
        <CountryDetails country={countriesToShow[0]} />
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countriesToShow.map((country) => (
          <CountryName key={country.name.common} country={country} />
        ))
      )}
    </>
  );
};

export default App;
