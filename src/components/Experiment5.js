import React, { useState } from "react";
import coursesData from "../data";
import "./Experiment5.css";

export default function Experiment5() {
  const [enrollments, setEnrollments] = useState(coursesData.map(() => 0));

  const changeEnrollment = (index, amount) => {
    const updated = [...enrollments];
    updated[index] = Math.max(updated[index] + amount, 0);
    setEnrollments(updated);
  };

  const totalPrice = enrollments.reduce(
    (total, count, i) => total + count * coursesData[i].price,
    0
  );

  return (
    <main className="counter-container">
      <h1 className="page-title">📚 Course Enrollment</h1>
      <ul className="course-list">
        {coursesData.map((course, i) => (
          <li key={i} className="course-item">
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>💲 Price: {course.price}</p>
              <p>👥 Enrolled: {enrollments[i]}</p>
              <p>
                💵 Course Total:{" "}
                {enrollments[i] * course.price}
              </p>
            </div>
            <div className="enroll-controls">
              <button onClick={() => changeEnrollment(i, -1)}>−</button>
              <span>{enrollments[i]}</span>
              <button onClick={() => changeEnrollment(i, 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-price">
        Total Price: <span>${totalPrice}</span>
      </div>
    </main>
  );
}