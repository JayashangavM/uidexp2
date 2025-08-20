
import React from "react";
import CourseCard from "../components/CourseCard";
import courses from "../data";
import "./Experiment1.css";

const Experiment1 = () => (
  <div className="experiment1-container">
    <h1 className="page-title">Available Courses</h1>
    <div className="course-list">
      {courses.map((course, i) => <CourseCard key={i} {...course} />)}
    </div>
  </div>
);

export default Experiment1;
