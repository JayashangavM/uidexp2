
import React, { useState } from "react";
import courses from "../data";
import "./Experiment3.css";

const Experiment3 = () => {
  const [courseIdx, setCourseIdx] = useState(0);
  const [gst, setGst] = useState(0);
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    const price = courses[courseIdx].price;
    const gstAmount = price * (parseFloat(gst) / 100);
    setResult((price + gstAmount).toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Course GST Calculator (Experiment 3)</h2>
      <div className="course-list-section">
        <h3>Course List</h3>
        <ul className="course-list">
          {courses.map((c,i)=>(
            <li key={i}>{c.title} - ${c.price}</li>
          ))}
        </ul>
      </div>
      <div className="calculator-form-group">
        <label>Choose Course: &nbsp;
          <select value={courseIdx} onChange={e=>setCourseIdx(Number(e.target.value))} className="calculator-input">
            {courses.map((c,i)=>(<option key={i} value={i}>{c.title}</option>))}
          </select>
        </label>
      </div>
      <div className="calculator-form-group">
        <label>GST Rate (%): &nbsp;
          <input type="number" value={gst} onChange={e=>setGst(e.target.value)} min="0" max="100" className="calculator-input" style={{width:60}} />
        </label>
      </div>
      <button onClick={handleCalculate} className="calculator-btn">Calculate Total</button>
      <div className="calculator-result">
        {result && <div>Total Price (incl. GST): ${result}</div>}
      </div>
    </div>
  );
};

export default Experiment3;
