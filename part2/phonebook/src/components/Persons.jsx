const Persons = ({ person, removePerson }) => {
  return (
    <>
      <li>
        {person.name} {person.number}
        <button onClick={() => removePerson(person.id, person.name)}>
          delete
        </button>
      </li>
    </>
  );
};

export default Persons;
