import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-card animate-in">
        <div className="not-found-mark" aria-hidden="true">
          <span>404</span>
        </div>
        <div className="section-label">
          <span>Error</span> Page Not Found
        </div>
        <h1>
          Lost in <em>Cyberspace.</em>
        </h1>
        <p className="not-found-description">
          The page or route you are looking for doesn&apos;t exist, was moved, or is temporarily unavailable.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="button button-primary">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Portfolio
          </Link>
          <Link href="/#projects" className="button button-ghost">
            <Home size={16} aria-hidden="true" />
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
