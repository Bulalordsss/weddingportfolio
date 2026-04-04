import type { ReactElement } from "react";

type NavbarProps = {
  hidden?: boolean;
};

export default function Navbar({ hidden }: NavbarProps): ReactElement | null {
  if (hidden) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center">
      <nav className="pointer-events-auto flex w-[min(920px,calc(100%-2rem))] items-center justify-between rounded-full border border-black/10 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-md dark:border-black/10 dark:bg-white/40">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-wide text-black/80 dark:text-black/80"
          aria-label="Joshua & Vien"
        >
          J &amp; V
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#story"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-black/60 transition-colors hover:text-black dark:text-black/60 dark:hover:text-black"
          >
            Story
          </a>
          <a
            href="#info"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-black/60 transition-colors hover:text-black dark:text-black/60 dark:hover:text-black"
          >
            Info
          </a>
          <a
            href="#faq"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-black/60 transition-colors hover:text-black dark:text-black/60 dark:hover:text-black"
          >
            FAQ
          </a>
          <a
            href="#rsvp"
            className="ml-1 rounded-full bg-black/80 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-black dark:bg-white/80 dark:text-black dark:hover:bg-white"
          >
            RSVP
          </a>
        </div>
      </nav>
    </header>
  );
}
