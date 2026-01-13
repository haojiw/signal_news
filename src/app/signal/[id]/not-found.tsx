import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-mono text-signal-down mb-4">[ 404 ]</h1>
        <p className="text-accent font-mono mb-6">SIGNAL NOT FOUND</p>
        <Link
          href="/"
          className="text-signal-up font-mono hover:underline"
        >
          &lt; BACK TO FEED
        </Link>
      </div>
    </main>
  );
}
