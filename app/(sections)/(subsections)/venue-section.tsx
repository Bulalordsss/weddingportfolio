'use client';

import * as React from 'react';
import Image from 'next/image';

type TimelineItem = {
  time: string;
  title: string;
};

const TIMELINE: TimelineItem[] = [
  { time: '9:00 AM', title: 'CALL TIME' },
  { time: '10:00 AM', title: 'WEDDING CEREMONY' },
  { time: '12:30 PM', title: 'RECEPTION' },
  { time: '4:00 PM', title: 'CLOSING CEREMONY' },
];

export default function VenueSection() {
  return (
    <section
      id="venue"
      aria-label="Venue"
      className="relative overflow-hidden bg-[#f1ebe1] text-[#44624a]"
    >
      {/* paper-ish background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="container relative mx-auto px-6 py-16 sm:py-20">
        {/* In web: this reads as one whole composition. In mobile: it collapses (no crop). */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[28px] bg-white/30 p-4 sm:p-6">
            <div className="grid gap-10 sm:gap-12">
              {/* Venue image */}
              <div className="mx-auto w-full max-w-5xl">
                <div className="overflow-hidden rounded-[18px] bg-white/40 shadow-[0_10px_35px_rgba(68,98,74,0.14)]">
                  {/*
                    Use explicit width/height to avoid occasional fill/layout issues.
                    Still does not crop (object-contain).
                  */}
                  <Image
                    src="/verdeli.jpg"
                    alt="Verdeli Garden & Cafe venue"
                    width={1600}
                    height={700}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              {/* Text + timeline */}
              <div className="text-center">
                <h2 className="font-serif text-4xl tracking-[-0.05em] text-[#44624a] sm:text-5xl">
                  Verdeli Garden & Cafe
                </h2>
                <p className="mt-3 text-[11px] font-semibold tracking-[0.32em] text-[#44624a]/60 sm:text-[12px]">
                  Purok 3B Brgy, Calinan, Baguio District, Davao City
                </p>

                <div className="mt-10">
                  {/* Timeline */}
                  <div className="relative mx-auto max-w-4xl">
                    {/* single connector line that aligns with all dots (desktop only) */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-[6px] hidden h-px w-[92%] -translate-x-1/2 bg-[#44624a]/25 sm:block"
                    />

                    <div className="mx-auto grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
                      {TIMELINE.map((item) => (
                        <TimelineNode key={item.time} item={item} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* RSVP button */}
                <div className="mt-12 flex justify-center">
                  <a
                    href="#rsvp"
                    className="inline-flex items-center justify-center rounded-full bg-[#44624a] px-8 py-3 text-[12px] font-semibold tracking-[0.22em] text-[#f1ebe1] shadow-[0_10px_30px_rgba(68,98,74,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    SUBMIT RSVP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ item }: { item: TimelineItem }) {
  return (
    <div className="relative flex flex-col items-center px-3">
      {/* dot */}
      <div
        className="relative z-10 h-3 w-3 rounded-full bg-[#44624a]/80"
        aria-hidden="true"
      />

      <div className="mt-4 font-serif text-2xl tracking-[-0.04em] text-[#44624a] sm:text-3xl">
        {item.time}
      </div>
      <div className="mt-2 text-[10px] font-semibold tracking-[0.32em] text-[#44624a]/60">
        {item.title}
      </div>
    </div>
  );
}
