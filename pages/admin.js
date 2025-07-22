import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ComplaintTable from '../components/ComplaintTable';
import Layout from "../components/Layout";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }
    if (token === 'admin-token') {
      // Allow access for hardcoded admin
      return;
    }
    fetch(`/api/auth?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (!data.user || data.user.role !== 'admin') {
          router.replace('/login');
        }
      })
      .catch(() => router.replace('/login'));
  }, [router]);

  return (
    <Layout>
      <ComplaintTable />
    </Layout>
  );
}