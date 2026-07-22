const CountryDetails = ({ country }) => {
  const imgStyles = {
    width: "12%",
    height: 'auto'
  };

  const languages = Object.values(country.languages);
  console.log(languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        {" "}
        Capital {country.capital} <br />
        Area {country.area}
      </p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        
        alt={country.flags.alt}
        style={imgStyles}
      />
    </>
  );
};

export default CountryDetails;
