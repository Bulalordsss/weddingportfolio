"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

import { Counter } from "@/components/ui/animated-counter";

export default function CountdownSection() {
  const ref = React.useRef<HTMLElement>(null);
  useInView(ref, { amount: 0.75, once: false });

  const targetDate = React.useMemo(
    () => new Date(Date.UTC(2026, 4, 15, 0, 0, 0)),
    [],
  );

  // IMPORTANT: avoid Date.now() in initial render to prevent hydration mismatch.
  const [remaining, setRemaining] = React.useState(() => getTimeParts(0));

  React.useEffect(() => {
    const tick = () => {
      setRemaining(getTimeParts(targetDate.getTime() - Date.now()));
    };

    tick(); // run immediately on mount
    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, [targetDate]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#f1ebe1] text-[#44624a]"
      aria-label="Countdown"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <motion.div
        className="container relative mx-auto px-6 py-24"
        initial={{ opacity: 1, y: 0, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0 }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-2xl tracking-[-0.04em] text-[#44624a]/70 sm:text-3xl">
            Save the Date!
          </p>

          <h2 className="mt-6 font-serif text-6xl leading-[0.9] tracking-[-0.06em] text-[#44624a] sm:text-7xl lg:text-[6.8rem]">
            May 15, 2026
          </h2>

          <div className="mt-12 flex flex-nowrap items-end justify-center gap-5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] sm:flex-wrap sm:gap-12">
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <CountdownStat label="DAYS" value={remaining.days} />
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
  pad = false,
}: {
  label: string;
  value: number;
  pad?: boolean;
}) {
  const [previousValue, setPreviousValue] = React.useState(value);

  React.useEffect(() => {
    setPreviousValue((current) => (current === value ? current : value));
  }, [value]);

  const formatted = pad ? String(value).padStart(2, "0") : String(value);

  return (
    <div className="min-w-[78px] text-center">
      <div className="relative mx-auto inline-block">
        <Counter
          start={Math.max(0, previousValue)}
          end={Math.max(0, value)}
          duration={0.9}
          className="justify-center px-0 text-[#34271f]"
          fontSize={38}
        />

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
