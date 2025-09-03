import React, { useState, useEffect } from "react";
import "./Experiment9.css";

export default function Experiment9() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks") || "[]"));
  const [form, setForm] = useState({ title: "", course: "", due: "" });
  const [filter, setFilter] = useState({ course: "all", status: "all" });

  useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addTask = e => {
    e.preventDefault();
    if (!form.title) return;
    setTasks([{ id: Date.now(), ...form, completed: false }, ...tasks]);
    setForm({ title: "", course: "", due: "" });
  };

  const toggleTask = id => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = id => setTasks(tasks.filter(t => t.id !== id));
  const clearCompleted = () => setTasks(tasks.filter(t => !t.completed));

  const courses = ["all", ...new Set(tasks.map(t => t.course).filter(Boolean))];
  const filtered = tasks.filter(t =>
    (filter.course === "all" || t.course === filter.course) &&
    (filter.status === "all" || (filter.status === "completed" ? t.completed : !t.completed))
  );

  return (
    <div className="exp9-container">
      <h1 className="page-title">Experiment 9: Learning Tasks</h1>

      {/* Add Task Form */}
      <section className="exp9-form">
        <h2>Add a Task</h2>
        <form onSubmit={addTask} className="task-form">
          {["title", "course", "due"].map(f => (
            <input
              key={f}
              name={f}
              type={f === "due" ? "date" : "text"}
              placeholder={f === "title" ? "Task Title (e.g., Complete Module 3 quiz)" : f === "course" ? "Course (e.g., React Basics)" : ""}
              value={form[f]}
              onChange={handleChange}
            />
          ))}
          <button type="submit" className="add-btn">Add</button>
        </form>
      </section>

      {/* Filters */}
      <section className="exp9-filters">
        <div className="filter-group">
          <label>Course</label>
          <select value={filter.course} onChange={e => setFilter({ ...filter, course: e.target.value })}>
            {courses.map(c => (
              <option key={c} value={c}>{c === "all" ? "All" : c}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
      </section>

      {/* Task List */}
      <section className="exp9-list">
        {filtered.length === 0 ? (
          <div className="empty">No tasks to show.</div>
        ) : (
          <ul>
            {filtered.map(t => (
              <li key={t.id} className={t.completed ? "completed" : ""}>
                <div className="meta">
                  <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
                  <div className="text">
                    <div className="title">{t.title}</div>
                    <div className="sub">
                      {t.course && <span className="badge">{t.course}</span>}
                      {t.due && <span className="due">Due: {t.due}</span>}
                    </div>
                  </div>
                </div>
                <button className="remove" onClick={() => deleteTask(t.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
