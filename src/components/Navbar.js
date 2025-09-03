import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/exp1", label: "EXP 1" },
  { to: "/exp2", label: "EXP 2" },
  { to: "/exp3", label: "EXP 3" },
  { to: "/exp4", label: "EXP 4" },
  { to: "/exp5", label: "EXP 5" },
  { to: "/exp6", label: "EXP 6" },
  { to: "/exp7", label: "EXP 7" },
  { to: "/exp8", label: "EXP 8" },
  { to: "/exp9", label: "EXP 9" },
  { to: "/exp10", label: "EXP 10" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Online Learning Platform</div>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
