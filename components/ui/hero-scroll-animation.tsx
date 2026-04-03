'use client';

import React, { forwardRef, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-semibold text-white"
      aria-label="Hero"
    >
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:object-[50%_35%]"
      />
      <div className="absolute inset-0 bg-black/35" />

      {/* Hero text overlay */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute font-serif inset-x-0 top-[58%] -translate-y-1/2 px-6 text-center">
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white/95 md:text-7xl">
            JOSHUA &amp; VIEN
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-8 px-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-white/80 md:text-xs">
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const images = [
    { src: '/hero2.jpg', rotate: '-rotate-6', offset: 'translate-y-2' },
    { src: '/hero3.jpg', rotate: 'rotate-3', offset: '-translate-y-4' },
    { src: '/hero4.jpg', rotate: '-rotate-2', offset: 'translate-y-6' },
    { src: '/hero5.jpg', rotate: 'rotate-6', offset: '-translate-y-1' },
  ] as const;

  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative flex min-h-screen items-center overflow-hidden text-white"
    >
      <Image
        src="/hero6.jpg"
        alt="Background"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/55" />

      <article className="container relative z-10 mx-auto px-6 py-10 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mt-6 grid grid-cols-2 gap-6 md:mt-8 md:grid-cols-4">
            {images.map((img, idx) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-lg bg-white p-3 shadow-[0_18px_60px_rgba(0,0,0,0.45)] ring-1 ring-black/20 transition-transform duration-300 hover:-translate-y-1 ${img.rotate} ${img.offset}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-zinc-100">
                  <Image
                    src={img.src}
                    alt={`Photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 h-6 text-center text-xs font-medium tracking-wide text-black/70">
                  {/* caption space */}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLElement>(function HeroScrollAnimation(
  _props,
  ref,
) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className="relative h-[200vh] bg-black">
      {/* forwarded ref attached to an inner wrapper to keep semantics */}
      <div ref={ref as React.RefObject<HTMLDivElement>} className="contents" />

      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />


    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
