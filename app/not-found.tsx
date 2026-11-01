import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>صفحہ نہیں ملا</p>
      <div className="hero-actions">
        <Link href="/" className="btn btn-primary">
          English home
        </Link>
        <Link href="/ur/" className="btn btn-outline" lang="ur" dir="rtl">
          اردو صفحہ
        </Link>
      </div>
    </main>
  );
}
