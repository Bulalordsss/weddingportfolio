'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

import { Counter } from '@/components/ui/animated-counter';

import CountdownSection from './(subsections)/countdown-section';
import VenueSection from './(subsections)/venue-section';

export default function InfoSection() {
  return (
    <section id="info">
      <CountdownSection />
      <VenueSection />
    </section>
  );
}

function CountdownStat({
  label,
  value,
  pad,
}: {
  label: string;
  value: number;
  pad: boolean;
}) {
  // Animate from previous -> next so ticking seconds remain readable.
  const prevRef = React.useRef(value);
  const prev = prevRef.current;
  React.useEffect(() => {
    prevRef.current = value;
  }, [value]);

  const formatted = pad ? String(value).padStart(2, '0') : String(value);

  return (
    <div className="min-w-[78px] text-center">
      <div className="relative mx-auto inline-block">
        {/* Animated digits */}
        <Counter
          start={Math.max(0, prev)}
          end={Math.max(0, value)}
          duration={0.9}
          className="justify-center px-0 text-[#34271f]"
          fontSize={38}
        />

        {/* Ensures consistent width for 2-digit fields */}
        <span className="pointer-events-none absolute inset-0 grid place-items-center font-serif text-[2.15rem] tracking-[-0.03em] text-transparent sm:text-[2.5rem]">
          {formatted}
        </span>
      </div>
      <div className="mt-2 text-[10px] font-semibold tracking-[0.3em] text-[#34271f]/55">
        {label}
      </div>
    </div>
  );
}

function DividerDot() {
  return (
    <div
      aria-hidden="true"
      className="hidden h-1.5 w-1.5 rounded-full bg-[#34271f]/35 sm:block"
    />
  );
}

function getTimeParts(ms: number) {
  const clamped = Math.max(0, ms);

  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}
