import React, { useState } from "react";
import "./Experiment10.css";

const USERS_KEY = "olp_exp10_users";
const SESSION_KEY = "olp_exp10_session";

export default function Experiment10() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem(SESSION_KEY)));

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const saveUsers = u => localStorage.setItem(USERS_KEY, JSON.stringify(u));

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const signup = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setMsg("All fields required");
    if (users.find(u => u.email === form.email)) return setMsg("Email exists");
    users.push({ ...form, id: Date.now() });
    saveUsers(users);
    setMsg("Account created. Please log in");
    setMode("login");
    setForm({ name: "", email: "", password: "" });
  };

  const login = e => {
    e.preventDefault();
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) return setMsg("Invalid email or password");
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  };

  return (
    <div className="exp10-container">
      <h1>User Authentication</h1>
      {currentUser ? (
        <div className="session-card">
          <h2>Welcome {currentUser.name}</h2>
          <p>Email: {currentUser.email}</p>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div className="auth-card">
          <div className="tabs">
            <button onClick={() => { setMode("login"); setMsg(""); }} className={mode==="login"?"active":""}>Login</button>
            <button onClick={() => { setMode("signup"); setMsg(""); }} className={mode==="signup"?"active":""}>Signup</button>
          </div>

          {msg && <div className="message">{msg}</div>}

          <form onSubmit={mode === "signup" ? signup : login} className="auth-form">
            {mode === "signup" && <input name="name" value={form.name} onChange={change} placeholder="Name" />}
            <input name="email" value={form.email} onChange={change} placeholder="Email" />
            <div className="pwd-row">
              <input name="password" type={showPwd ? "text" : "password"} value={form.password} onChange={change} placeholder="Password" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}>{showPwd ? "🙈" : "👁️"}</button>
            </div>
            <button className="primary">{mode === "signup" ? "Create Account" : "Log In"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
