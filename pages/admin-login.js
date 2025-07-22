import { useState } from 'react';
import { useRouter } from 'next/router';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('token', 'admin-token');
      router.push('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '1rem', boxShadow: '0 4px 16px rgba(44,44,44,0.10)', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', color: '#292e61', fontFamily: 'Georgia, serif', marginBottom: 24 }}>Admin Login</h2>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{ width: '100%', background: '#292e61', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 0', fontWeight: 600, fontSize: 16, marginBottom: 12, cursor: 'pointer' }}>Login as Admin</button>
        <div style={{ marginTop: 20, textAlign: 'center', color: '#555', fontSize: 15 }}>
          <div><b>Demo Admin Credentials:</b></div>
          <div>Email: <span style={{ fontFamily: 'monospace' }}>admin@example.com</span></div>
          <div>Password: <span style={{ fontFamily: 'monospace' }}>admin123</span></div>
        </div>
      </form>
    </div>
  );
} 