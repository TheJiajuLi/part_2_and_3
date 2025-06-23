import React from "react";

type Part = {
  name: string;
  exercises: number;
  id: number;
};

type CourseType = {
  name: string;
  id: number;
  parts: Part[];
};

type CourseProps = {
  course: CourseType;
};

const Header = ({ name }: { name: string }) => <h2>{name}</h2>;

const Part = ({ part }: { part: Part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }: { parts: Part[] }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }: { parts: Part[] }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

const Course = ({ course }: CourseProps) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
