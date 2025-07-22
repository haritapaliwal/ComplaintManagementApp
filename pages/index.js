import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-header-bar"></div>
      <div className="home-box">
        <h1 className="home-title">Welcome to Complaint Portal</h1>
        <div className="home-buttons">
          <Link href="/login" passHref>
            <button className="home-btn">Submit Complaint</button>
          </Link>
          <Link href="/admin-login" passHref>
            <button className="home-btn home-btn-outline">Admin Portal</button>
          </Link>
        </div>
      </div>
    </div>
  );
} 