import React, { useState, useEffect } from "react";
import "./Experiment8.css";

export default function Experiment8() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", instructor: "", category: "", duration: "", price: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      setCourses(await res.json());
    } catch { console.log("Using local state, DB not connected"); }
  };

  const saveData = async (url, method, data) => {
    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: data && JSON.stringify(data) });
    } catch {}
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.instructor) return;

    if (editId) {
      const updated = { ...form, _id: editId };
      setCourses(courses.map(c => c._id === editId ? updated : c));
      await saveData(`http://localhost:5000/api/courses/${editId}`, "PUT", updated);
      setEditId(null);
    } else {
      const res = await fetch("http://localhost:5000/api/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
        .then(r => r.json())
        .catch(() => ({ ...form, _id: Date.now() }));
      setCourses([...courses, res]);
    }

    setForm({ title: "", instructor: "", category: "", duration: "", price: "" });
  };

  const handleDelete = async id => {
    setCourses(courses.filter(c => c._id !== id));
    await saveData(`http://localhost:5000/api/courses/${id}`, "DELETE");
  };

  return (
    <div className="experiment8-container">
      <h1 className="page-title">Simple Course Management</h1>

      <form onSubmit={handleSubmit} className="simple-form">
        {["title", "instructor", "duration", "price"].map(f => (
          <input key={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} placeholder={f} required={f==="title"||f==="instructor"} />
        ))}
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="">Select Category</option>
          {["Web Development", "Programming", "Design"].map(c => <option key={c}>{c}</option>)}
        </select>
        <button>{editId ? "Update" : "Add"} Course</button>
        {editId && <button type="button" onClick={() => setEditId(null)}>Cancel</button>}
      </form>

      <div className="courses-section">
        <h2>Courses ({courses.length})</h2>
        <div className="courses-grid">
          {courses.map(c => (
            <div key={c._id} className="course-card">
              <h3>{c.title}</h3><p>👨‍🏫 {c.instructor}</p><p>📚 {c.category}</p><p>⏱️ {c.duration}</p><p>💰 {c.price}</p>
              <div className="course-actions">
                <button onClick={() => { setForm(c); setEditId(c._id); }}>✏️ Edit</button>
                <button onClick={() => handleDelete(c._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
