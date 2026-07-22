const CountryName = ({country, handleClick}) => {


  return (
    <>
      <li>{country.name.common} <button onClick={() => handleClick(country)}>Show</button></li>
      
    </>
  );
};

export default CountryName