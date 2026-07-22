const CountryDetails = ({ country, weather }) => {
  const imgStyles = {
    width: "12%",
    height: "auto",
  };
  for (let key in weather) {
    console.log(key);
  }

  const icon = weather?.weather?.[0]?.icon;

  const languages = Object.values(country.languages ?? {});
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        {" "}
        Capital {country.capital} <br />
        Area {country.area}
      </p>
      <h2>Languages</h2>
      {languages.length > 0 ? (
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      ) : null}
      <img src={country.flags.png} alt={country.flags.alt} style={imgStyles} />
      {weather && (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={weather?.weather?.[0]?.description ?? "Weather icon"}
            />
          )}
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default CountryDetails;
