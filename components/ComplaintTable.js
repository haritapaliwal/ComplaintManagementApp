import { useEffect, useState } from "react";

const statusOptions = ["Pending", "In Progress", "Resolved"];
const priorityOptions = ["Low", "Medium", "High"];

export default function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await fetch("/api/complaints");
    const data = await res.json();
    setComplaints(data);
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`/api/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    fetchComplaints();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/complaints/${id}`, {
      method: "DELETE"
    });
    fetchComplaints();
  };

  const filteredComplaints = complaints.filter(c =>
    (statusFilter ? c.status === statusFilter : true) &&
    (priorityFilter ? c.priority === priorityFilter : true)
  );

  return (
    <div className="complaint-table-container">
      <div className="complaint-table-title">Complaints</div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Date Submitted</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((c) => (
            <tr key={c._id}>
              <td>{c.title}</td>
              <td>{c.category}</td>
              <td>{c.priority}</td>
              <td>{new Date(c.dateSubmitted).toLocaleString()}</td>
              <td>
                <select value={c.status} onChange={e => handleStatusChange(c._id, e.target.value)}>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(c._id)} style={{background: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '0.3rem 0.8rem', cursor: 'pointer'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}