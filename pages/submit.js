import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ComplaintForm from '../components/ComplaintForm';
import Layout from "../components/Layout";

export default function SubmitPage() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }
    fetch(`/api/auth?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (!data.user || data.user.role !== 'user') {
          router.replace('/login');
        }
      })
      .catch(() => router.replace('/login'));
  }, [router]);

  return (
    <Layout>
      <ComplaintForm />
    </Layout>
  );
}