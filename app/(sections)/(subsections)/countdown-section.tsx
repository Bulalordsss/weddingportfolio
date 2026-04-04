'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

import { Counter } from '@/components/ui/animated-counter';

export default function CountdownSection() {
  const ref = React.useRef<HTMLElement>(null);
  // Reveal later (section mostly in view) so the fade doesn't happen too early while scrolling.
  const inView = useInView(ref, { amount: 0.75, once: false });

  const targetDate = React.useMemo(() => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const target = new Date(Date.UTC(year, 3, 15, 0, 0, 0)); // April is month 3 (0-based)
    return target.getTime() < now.getTime()
      ? new Date(Date.UTC(year + 1, 3, 15, 0, 0, 0))
      : target;
  }, []);

  const [remaining, setRemaining] = React.useState(() =>
    getTimeParts(targetDate.getTime() - Date.now()),
  );

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(getTimeParts(targetDate.getTime() - Date.now()));
    }, 1000);

    return () => window.clearInterval(id);
  }, [targetDate]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-transparent text-[#34271f]"
      aria-label="Countdown"
    >
      {/* match story section glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#fff8ef_0%,#f7f0e6_45%,#f0e4d5_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-white/40 blur-3xl"
      />

      {/* subtle paper speckles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(rgba(52,39,31,0.22) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <motion.div
        className="container relative mx-auto px-6 py-24"
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 26, scale: 0.98 }
        }
        transition={{ duration: 1.1, ease: [0.2, 0.75, 0.2, 1] }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-2xl tracking-[-0.04em] text-[#3c2d24]/70 sm:text-3xl">
            so please join us...
          </p>

          <h2 className="mt-6 font-serif text-6xl leading-[0.9] tracking-[-0.06em] text-[#34271f] sm:text-7xl lg:text-[6.8rem]">
            april 15, 2026
          </h2>

          <div className="mt-12 flex flex-nowrap items-end justify-center gap-5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] sm:flex-wrap sm:gap-12">
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <CountdownStat label="DAYS" value={remaining.days} pad={false} />
            <DividerDot />
            <CountdownStat label="HOURS" value={remaining.hours} pad />
            <DividerDot />
            <CountdownStat label="MINUTES" value={remaining.minutes} pad />
            <DividerDot />
            <CountdownStat label="SECONDS" value={remaining.seconds} pad />
          </div>
        </div>
      </motion.div>
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
