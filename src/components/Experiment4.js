import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./Experiment4.css";
function Home({ courses }) {
  return (
    <div className="ecom-page home-landing">
      <h2 className="home-title">Welcome to Online Learning</h2>
      <ul className="home-courses-list">
        {courses.map((c, i) => <li key={i}><strong>{c.name}</strong> - ${c.price}</li>)}
      </ul>
    </div>
  );
}
function Products({ courses, addToCart, addCourse }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  return (
    <div className="ecom-page">
      <h2>Courses</h2>
      <ul className="home-courses-list">
        {courses.map((c, i) => (
          <li key={i} className="course-list-item">
            <span><strong>{c.name}</strong> - ${c.price}</span>
            <button className="ecom-btn add-btn" onClick={() => addToCart(i)}>Add</button>
          </li>
        ))}
      </ul>
      <div className="add-course-form">
        <input className="ecom-input" value={name} onChange={e => setName(e.target.value)} placeholder="Course name" />
        <input className="ecom-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" />
        <button className="ecom-btn add-btn" onClick={() => { if(name && price) { addCourse(name, price); setName(""); setPrice(""); } }}>Add Course</button>
      </div>
    </div>
  );
}
function Cart({ cart, courses, updateQty, removeFromCart }) {
  return (
    <div className="ecom-page">
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <ul className="home-courses-list">
          {cart.map((item, i) => (
            <li key={i} className="course-list-item">
              <span>{courses[item.idx].name} - ${courses[item.idx].price} x</span>
              <input className="ecom-input cart-qty" type="number" min="1" value={item.qty} onChange={e => updateQty(i, e.target.value)} />
              <button className="ecom-btn delete-btn" onClick={() => removeFromCart(i)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default function Experiment4() {
  const [courses, setCourses] = useState([
    { name: "React Course", price: 100 },
    { name: "JS Bootcamp", price: 80 },
    { name: "CSS Mastery", price: 60 },
  ]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  function addToCart(idx) {
    setCart(prev => {
      const found = prev.find(item => item.idx === idx);
      if (found) return prev.map(item => item.idx === idx ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { idx, qty: 1 }];
    });
    navigate("/exp4/cart");
  }
  function updateQty(i, qty) {
    setCart(prev => prev.map((item, idx) => idx === i ? { ...item, qty: Math.max(1, Number(qty)) } : item));
  }
  function removeFromCart(i) {
    setCart(prev => prev.filter((_, idx) => idx !== i));
  }
  function addCourse(name, price) {
    setCourses(prev => [...prev, { name, price }]);
  }
  return (
    <div className="ecom-container">
      <nav className="ecom-nav">
        <Link to="/">Main Home</Link>
        <Link to="/exp4/products">Courses</Link>
        <Link to="/exp4/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home courses={courses} />} />
        <Route path="/products" element={<Products courses={courses} addToCart={addToCart} addCourse={addCourse} />} />
        <Route path="/cart" element={<Cart cart={cart} courses={courses} updateQty={updateQty} removeFromCart={removeFromCart} />} />
      </Routes>
    </div>
  );
}
