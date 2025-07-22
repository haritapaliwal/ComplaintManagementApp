import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: isRegister ? 'register' : 'login',
        email,
        password,
        role: isRegister ? 'user' : undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }
    if (isRegister) {
      setIsRegister(false);
      setError('Registration successful! Please log in.');
      setPassword('');
      setConfirmPassword('');
    } else {
      localStorage.setItem('token', data.token);
      router.push('/submit');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '1rem', boxShadow: '0 4px 16px rgba(44,44,44,0.10)', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', color: '#292e61', fontFamily: 'Georgia, serif', marginBottom: 24 }}>
          {isRegister ? 'Register' : 'Login'}
        </h2>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        {isRegister && (
          <div style={{ marginBottom: 16 }}>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
          </div>
        )}
        {error && <div style={{ color: error.includes('success') ? 'green' : 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{ width: '100%', background: '#292e61', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 0', fontWeight: 600, fontSize: 16, marginBottom: 12, cursor: 'pointer' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
        <div style={{ textAlign: 'center' }}>
          {isRegister ? (
            <span>Already have an account? <a href="#" onClick={e => { e.preventDefault(); setIsRegister(false); setError(''); }}>Login</a></span>
          ) : (
            <span>Don&apos;t have an account? <a href="#" onClick={e => { e.preventDefault(); setIsRegister(true); setError(''); }}>Register</a></span>
          )}
        </div>
      </form>
    </div>
  );
} 