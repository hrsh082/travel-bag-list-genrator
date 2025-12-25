"use client";

import Link from "next/link";

export const SiteFooter = () => (
  <footer className="border-t border-[var(--border-muted)] bg-white py-10 text-sm text-slate-600">
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--brand-primary)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2L15 8H9L12 2Z" fill="currentColor" />
              <path d="M4 12a8 8 0 1016 0A8 8 0 004 12z" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <span>Travel Bag</span>
          </Link>
          <p className="text-sm text-slate-500">Smart packing lists for every trip.</p>
        </div>

        <nav className="grid grid-cols-2 gap-6 sm:flex sm:gap-12" aria-label="Footer navigation">
          <div>
            <h4 className="text-xs font-semibold text-slate-700 uppercase">Product</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/plan" className="hover:underline">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="hover:underline">
                  Checklists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-700 uppercase">Resources</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/history" className="hover:underline">
                  History
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:underline">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="w-full max-w-xs">
          <h4 className="text-xs font-semibold text-slate-700 uppercase">Stay updated</h4>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            />
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-primary)] px-3 py-2 text-white">
              Subscribe
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3 text-slate-500">
            <a href="#" aria-label="Twitter" className="hover:text-[var(--brand-primary)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 5.92c-.64.28-1.33.47-2.05.55a3.6 3.6 0 001.6-1.98 7.2 7.2 0 01-2.28.87 3.6 3.6 0 00-6.14 3.28A10.2 10.2 0 013 4.9a3.6 3.6 0 001.12 4.8c-.52-.02-1.02-.16-1.45-.4v.04a3.6 3.6 0 002.88 3.53c-.28.08-.57.12-.87.12-.21 0-.42-.02-.62-.06a3.6 3.6 0 003.36 2.5A7.22 7.22 0 012 19.54 10.2 10.2 0 008.8 21c6.67 0 10.32-5.52 10.32-10.3v-.47A7.2 7.2 0 0022 5.92z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-[var(--brand-primary)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1 .1 1.6-.8 1.6-.8.9-1.5 2.4-1 3-.8.1-.7.4-1 .7-1.3-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.3a11.3 11.3 0 016 0c2.3-1.6 3.3-1.3 3.3-1.3.7 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.3 0 4.5-2.8 5.5-5.5 5.8.4.4.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0012 .5z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[var(--brand-primary)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.98 3.5a2.5 2.5 0 11.02 0H4.98zM3 8.99h4v12H3v-12zM9 8.99h3.8v1.6h.1c.5-.9 1.8-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.8v6.5h-4v-5.8c0-1.4 0-3.2-2-3.2-2 0-2.3 1.5-2.3 3v6h-4v-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[var(--border-muted)] pt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Travel Bag Checklist Generator. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-xs hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-xs hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

