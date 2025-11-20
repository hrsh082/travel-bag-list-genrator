export const SiteFooter = () => (
  <footer className="border-t border-[var(--border-muted)] bg-white py-6 text-sm text-slate-500">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
      <p>© {new Date().getFullYear()} Travel Bag Checklist Generator.</p>
    </div>
  </footer>
);

