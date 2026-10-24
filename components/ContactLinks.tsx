"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Phone } from "lucide-react";
import { contactLinks } from "@/data/portfolio";

function SocialBadge({ brand }: { brand: "github" | "linkedin" }) {
  return (
    <span className={`contact-badge contact-badge-${brand}`} aria-hidden="true">
      {brand === "github" ? (
        <svg viewBox="0 0 16 16" focusable="false">
          <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.64 5.47 7.71.4.08.55-.17.55-.39 0-.19-.01-.83-.01-1.51-2.01.38-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.23 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.21-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.5 7.5 0 0 1 8 3.91c.68 0 1.36.09 2 .27 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.12-1.87 3.81-3.65 4.02.29.25.54.74.54 1.5 0 1.08-.01 1.95-.01 2.22 0 .22.15.47.55.39A8.13 8.13 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M5.34 3.5A2.34 2.34 0 1 1 .66 3.5a2.34 2.34 0 0 1 4.68 0ZM.99 7.1h4.7V22H.99V7.1Zm7.74 0h4.5v2.04h.06c.63-1.19 2.16-2.44 4.45-2.44 4.76 0 5.64 3.13 5.64 7.2V22h-4.69v-7.17c0-1.71-.03-3.91-2.38-3.91-2.39 0-2.75 1.86-2.75 3.79V22H8.73V7.1Z" />
        </svg>
      )}
    </span>
  );
}

function GmailBadge() {
  return (
    <span className="contact-badge contact-badge-gmail" aria-hidden="true">
      <svg viewBox="0 0 24 18" focusable="false">
        <path className="gmail-red" d="M1 16V2.1A2.1 2.1 0 0 1 4.5.46L12 6.1 19.5.46A2.1 2.1 0 0 1 23 2.1V16h-4V5.95l-7 5.25-7-5.25V16H1Z" />
        <path className="gmail-blue" d="M1 2.1A2.1 2.1 0 0 1 4.5.46L12 6.1 19.5.46A2.1 2.1 0 0 1 23 2.1v1.7l-4 2.15V5.95l-7 5.25-7-5.25v.01L1 3.8V2.1Z" />
      </svg>
    </span>
  );
}

function PhoneBadge() {
  return (
    <span className="contact-badge contact-badge-phone" aria-hidden="true">
      <Phone size={13} strokeWidth={2.4} />
    </span>
  );
}

export default function ContactLinks() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (e: React.MouseEvent, key: string, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="contact-links">
      {contactLinks.map((link) => {
        const isExternal = link.href.startsWith("http");
        const isCopyable = link.icon === "email" || link.icon === "phone";
        const isCopied = copiedKey === link.label;

        return (
          <a
            href={link.href}
            key={link.label}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {link.icon === "linkedin" ? (
              <SocialBadge brand="linkedin" />
            ) : link.icon === "github" ? (
              <SocialBadge brand="github" />
            ) : link.icon === "phone" ? (
              <PhoneBadge />
            ) : (
              <GmailBadge />
            )}
            <span>
              <small>{link.label}</small>
              {link.value}
            </span>
            <div className="contact-action-group">
              {isCopyable && (
                <button
                  type="button"
                  className={`copy-btn ${isCopied ? "copied" : ""}`}
                  onClick={(e) => handleCopy(e, link.label, link.value)}
                  title={`Copy ${link.label.toLowerCase()}`}
                  aria-label={`Copy ${link.label.toLowerCase()} to clipboard`}
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="copy-icon" aria-hidden="true" />
                      <span className="copy-text">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="copy-icon" aria-hidden="true" />
                      <span className="copy-text">Copy</span>
                    </>
                  )}
                </button>
              )}
              <ArrowUpRight size={16} aria-hidden="true" />
            </div>
          </a>
        );
      })}
    </div>
  );
}
