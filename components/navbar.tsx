import type { ReactElement } from "react";

type NavbarProps = {
  hidden?: boolean;
};

export default function Navbar({ hidden }: NavbarProps): ReactElement | null {
  if (hidden) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center">
      <nav className="pointer-events-auto flex w-[min(920px,calc(100%-2rem))] items-center justify-between rounded-full border border-[#44624a]/20 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-md">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-wide text-[#44624a]/90"
          aria-label="Joshua & Vien"
        >
          J &amp; V
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#story"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-[#44624a]/70 transition-colors hover:text-[#44624a]"
          >
            Story
          </a>
          <a
            href="#info"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-[#44624a]/70 transition-colors hover:text-[#44624a]"
          >
            Info
          </a>
          <a
            href="#faq"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-[#44624a]/70 transition-colors hover:text-[#44624a]"
          >
            FAQ
          </a>
          <a
            href="#rsvp"
            className="ml-1 rounded-full bg-[#44624a] px-4 py-2 text-xs font-semibold text-[#f1ebe1] shadow-sm transition-colors hover:bg-[#3a5641]"
          >
            RSVP
          </a>
        </div>
      </nav>
    </header>
  );
}
