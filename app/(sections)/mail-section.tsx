'use client';

import Image from 'next/image';

interface MailSectionProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function MailSection({ isOpen, onOpen }: MailSectionProps) {
  return (
    <section
      aria-label="Invitation cover"
      className={[
        'fixed inset-0 z-50 overflow-hidden transition-all duration-700 ease-out',
        isOpen
          ? 'pointer-events-none translate-y-6 scale-[1.02] opacity-0'
          : 'translate-y-0 scale-100 opacity-100',
      ].join(' ')}
    >
      <Image
        src="/hero7.jpg"
        alt="Romantic seaside background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[#142018]/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-10">
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
          <button
            type="button"
            onClick={onOpen}
            aria-label="Open the invitation"
            className="group relative w-full max-w-[780px] transition duration-500 ease-out hover:scale-[1.015] focus:outline-none focus-visible:scale-[1.015] focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
          >
            <div className="absolute inset-x-[6%] bottom-[-1.5rem] top-[10%] rounded-[2.5rem] bg-black/20 blur-3xl transition duration-500 group-hover:bg-black/30" />
            <Image
              src="/mail.png"
              alt="Wedding invitation envelope"
              width={1500}
              height={1120}
              priority
              sizes="(max-width: 768px) 90vw, 780px"
              className="relative z-10 h-auto w-full drop-shadow-[0_18px_55px_rgba(0,0,0,0.45)]"
            />
          </button>

          <p className="mt-10 text-center text-[11px] font-semibold uppercase tracking-[0.42em] text-white/90 sm:text-xs">
            Click the mail to open
          </p>
        </div>
      </div>
    </section>
  );
}
