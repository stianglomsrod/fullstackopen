import { useState, useEffect } from "react";
import helpers from "./services/helpers";
import CountryName from "./components/CountryName";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    helpers
      .getAll()
      .then((countriesArr) => {
        setCountries(countriesArr);
      })
      .catch((error) => {
        console.log("Failed to load countries: ", error);

      });
  }, []);

  const countriesToShow = countries
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchFilter.toLowerCase()),
      )
    : [];

  const countryToShow =
    selectedCountry ||
    (countriesToShow.length === 1 ? countriesToShow[0] : null);

  useEffect(() => {
  if (!countryToShow) {
    return
  }

  const latLng = countryToShow.capitalInfo?.latlng

  if (!latLng) {
    return
  }

  const [lat, lon] = latLng
  let ignoreResponse = false

  helpers
    .getWeather(lat, lon)
    .then((weatherData) => {
      if (!ignoreResponse) {
        setWeather(weatherData)

      }
    })
    .catch((error) => {
      if (!ignoreResponse) {
        console.log('Failed to load weather:', error)
        setWeather(null)
      }
    })

  return () => {
    ignoreResponse = true
  }
}, [countryToShow])

const handleFilterChange = (event) => {
  setSearchFilter(event.target.value)
  setSelectedCountry(null)
  setWeather(null)

}

const handleClick = (country) => {
  setWeather(null)

  setSelectedCountry(country)
}

  return (
    <>
      <div>
        find countries{" "}
        <input value={searchFilter} onChange={handleFilterChange} />
      </div>

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} weather={weather} />
      ) : searchFilter === "" ? null : countriesToShow.length === 1 ? (
        <CountryDetails country={countriesToShow[0]} weather={weather} />
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countriesToShow.map((country) => (
          <CountryName
            key={country.name.common}
            country={country}
            handleClick={handleClick}
          />
        ))
      )}
    </>
  );
};

export default App;
