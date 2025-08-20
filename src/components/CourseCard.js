import React from "react";
import "./CourseCard.css";

export default function CourseCard({ title, description, image, price }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <div className="course-details">
        <h2 className="course-title">{title}</h2>
        <p className="course-description">{description}</p>
        <div className="course-footer">
          <span className="course-price">${price}</span>
          <button className="enroll-btn">Enroll Now</button>
        </div>
      </div>
    </div>
  );
}
