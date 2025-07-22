import { useState } from "react";

const categories = ["Product", "Service", "Support"];
const priorities = ["Low", "Medium", "High"];

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState(priorities[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here (API call)
    await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category, priority })
    });
    setSubmitted(true);
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setPriority(priorities[0]);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="complaint-form-container">
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Complaint Title</label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter complaint title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your complaint" required />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)} required>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Priority</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {priorities.map(p => (
              <label key={p} style={{ fontWeight: 400 }}>
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  required
                /> {p}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
        {submitted && (
          <div style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>
            Complaint submitted! Your complaint has been received.
          </div>
        )}
      </form>
    </div>
  );
}