export default function Layout({ children }) {
  return (
    <div>
      <header className="header">
        <h1>Complaint Portal</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
} 