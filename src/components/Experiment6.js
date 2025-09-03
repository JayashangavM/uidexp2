import React, { useState } from "react";
import "./Experiment6.css";

export default function Experiment6() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", quantity: 1 });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.name === "quantity" ? +e.target.value : e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter item name";
    if (form.quantity <= 0) err.quantity = "Quantity must be positive";
    if (Object.keys(err).length) return setErrors(err);

    setItems([{ id: Date.now(), ...form, name: form.name.trim(), description: form.description.trim() }, ...items]);
    setForm({ name: "", description: "", quantity: 1 });
    setErrors({});
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} />
        {errors.quantity && <span className="error">{errors.quantity}</span>}

        <button type="submit">Add Item</button>
      </form>

      <div className="items">
        {items.length === 0 ? <p>No items yet.</p> :
          items.map(i => (
            <div key={i.id} className="card">
              <h3>{i.name}</h3>
              <p>{i.description}</p>
              <small>Qty: {i.quantity}</small>
              <button onClick={() => setItems(items.filter(x => x.id !== i.id))}>Remove</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
