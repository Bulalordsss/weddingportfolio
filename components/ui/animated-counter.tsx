"use client";

import * as React from "react";

import { type MotionValue, motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

const fontSize = 40;
const padding = 10;
const height = fontSize + padding;

function useHasMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

interface CounterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
}

export const Counter = ({
  start = 0,
  end,
  duration = end,
  className,
  fontSize = 30,
  ...rest
}: CounterProps) => {
  const mounted = useHasMounted();
  const [value, setValue] = useState(start);

  // Reset when inputs change (important for countdowns where `end` changes every second).
  useEffect(() => {
    setValue(start);
  }, [start, end]);

  useEffect(() => {
    if (!mounted) return;
    if (!isFinite(end) || !isFinite(start)) return;

    // Nothing to animate.
    if (start === end) return;

    const direction = end > start ? 1 : -1;
    const steps = Math.max(1, Math.abs(end - start));

    // duration is in seconds in the original component.
    const totalMs = Math.max(0, duration) * 1000;
    const intervalMs = Math.max(16, Math.floor(totalMs / steps));

    const id = window.setInterval(() => {
      setValue((prev) => {
        if (prev === end) return prev;
        const next = prev + direction;
        if (direction > 0) return next > end ? end : next;
        return next < end ? end : next;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [mounted, start, end, duration]);

  // To avoid hydration mismatches, server + first client render should be identical.
  // So we render a non-animated value until after mount.
  if (!mounted) {
    return (
      <div
        style={{ fontSize }}
        {...rest}
        className={cn(
          "flex overflow-hidden rounded px-2 leading-none text-primary font-bold ",
          className,
        )}
      >
        <span className="tabular-nums" suppressHydrationWarning>
          {end}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ fontSize }}
      {...rest}
      className={cn(
        "flex overflow-hidden rounded px-2 leading-none text-primary font-bold ",
        className,
      )}
    >
      {value >= 100000 && <Digit place={100000} value={value} />}
      {value >= 10000 && <Digit place={10000} value={value} />}
      {value >= 1000 && <Digit place={1000} value={value} />}
      {value >= 100 && <Digit place={100} value={value} />}
      {value >= 10 && <Digit place={10} value={value} />}
      <Digit place={1} value={value} />
    </div>
  );
};

function Digit({ place, value }: { place: number; value: number }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
