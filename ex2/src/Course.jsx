import React from 'react';

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} - {part.exercises} exercises</p>
    </div>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
}

export default Course;
