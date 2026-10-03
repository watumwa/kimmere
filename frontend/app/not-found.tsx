import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container panel">
        <div className="eyebrow">Kimmere Foodhub</div>
        <h1 className="title">Page not found</h1>
        <p className="lead">
          That page is not available. Head back to the menu to keep ordering.
        </p>
        <div className="actions">
          <Link className="btn" href="/menu">
            Browse menu
          </Link>
          <Link className="btn secondary" href="/">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
