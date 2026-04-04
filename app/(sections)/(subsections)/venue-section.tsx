'use client';

import * as React from 'react';
import Image from 'next/image';

type TimelineItem = {
  time: string;
  title: string;
};

const TIMELINE: TimelineItem[] = [
  { time: '4:00 PM', title: 'CHAPEL' },
  { time: '4:30 PM', title: 'WEDDING CEREMONYi' },
  { time: '6:00 PM', title: 'RECEPTION' },
  { time: '9:00 PM', title: 'CLOSING CEREMONY' },
];

export default function VenueSection() {
  return (
    <section
      id="venue"
      aria-label="Venue"
      className="relative overflow-hidden bg-[#f7f0e6] text-[#34271f]"
    >
      {/* paper-ish background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(rgba(52,39,31,0.22) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="container relative mx-auto px-6 py-16 sm:py-20">
        {/* In web: this reads as one whole composition. In mobile: it collapses (no crop). */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[28px] bg-[#f7f0e6]/60 p-4 sm:p-6">
            <div className="grid gap-10 sm:gap-12">
              {/* Venue image */}
              <div className="mx-auto w-full max-w-5xl">
                <div className="overflow-hidden rounded-[18px] bg-white/40 shadow-[0_10px_35px_rgba(52,39,31,0.12)]">
                  {/*
                    Use explicit width/height to avoid occasional fill/layout issues.
                    Still does not crop (object-contain).
                  */}
                  <Image
                    src="/samplevenue.jpg"
                    alt="Cecil Green Park House venue"
                    width={1600}
                    height={700}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              {/* Text + timeline */}
              <div className="text-center">
                <h2 className="font-serif text-4xl tracking-[-0.05em] text-[#34271f] sm:text-5xl">
                  Cecil Green Park House
                </h2>
                <p className="mt-3 text-[11px] font-semibold tracking-[0.32em] text-[#34271f]/55 sm:text-[12px]">
                  6251 CECIL GREEN PARK RD, VANCOUVER, BC V6T 1Z1, CANADA
                </p>

                <div className="mt-10">
                  {/* Timeline */}
                  <div className="relative mx-auto max-w-4xl">
                    {/* single connector line that aligns with all dots (desktop only) */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-[6px] hidden h-px w-[92%] -translate-x-1/2 bg-[#34271f]/20 sm:block"
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
                    className="inline-flex items-center justify-center rounded-full bg-[#34271f] px-8 py-3 text-[12px] font-semibold tracking-[0.22em] text-[#f7f0e6] shadow-[0_10px_30px_rgba(52,39,31,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
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
        className="relative z-10 h-3 w-3 rounded-full bg-[#34271f]/70"
        aria-hidden="true"
      />

      <div className="mt-4 font-serif text-2xl tracking-[-0.04em] sm:text-3xl">
        {item.time}
      </div>
      <div className="mt-2 text-[10px] font-semibold tracking-[0.32em] text-[#34271f]/55">
        {item.title}
      </div>
    </div>
  );
}
