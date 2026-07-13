const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0,
  );

  return (
    <>
      <strong>total of {total} exercises</strong>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
      <Total parts={parts} />
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

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course