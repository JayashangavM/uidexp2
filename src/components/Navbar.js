import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/exp1", label: "Experiment 1" },
  { to: "/exp2", label: "Experiment 2" },
  { to: "/exp3", label: "Experiment 3" },
  { to: "/exp4", label: "Experiment 4" },
  { to: "/exp5", label: "Experiment 5" },
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
