
const Part = (props) => {
  return (
    <>
      <p key={props.id}>
        {props.name} {props.exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  
  
  const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

  return (
    <>
      <strong>total of{" "}{total}{" "}exercises</strong>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
      <Total parts={parts}/>
    </>
  );
};

const Header = ({ courseName }) => {
  return (
    <>
      <h1>{courseName}</h1>
    </>
  );
};

const Course = (props) => {
  const parts = [...props.course.parts];

  return (
    <>
      <Header courseName={props.course.name} />
      <Content parts={parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
