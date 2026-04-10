'use client';

import React, { forwardRef, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
});

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <div className="sticky top-0 h-[100svh] w-full">
      <motion.section
        style={{ scale, rotate }}
        className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#f1ebe1] font-semibold text-[#44624a]"
        aria-label="Hero"
      >
        {/* Hero text overlay */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="flex flex-col items-center">
              {/* Keep existing font/color for this heading */}
              <h1 className="max-w-[12ch] font-serif text-5xl font-semibold leading-[0.92] tracking-tight text-[#44624a] md:text-7xl">
                <span className="block">WE ARE</span>
                <span className="block">GETTING MARRIED</span>
              </h1>

              {/* Replace names with the provided artwork image */}
              <div className="relative mt-4 w-[min(360px,78vw)] md:mt-5 md:w-[min(420px,62vw)]">
                <Image
                  src="/J&V.png"
                  alt="Joshua and Vien"
                  width={1040}
                  height={520}
                  priority
                  className="h-auto w-full select-none object-contain"
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-8 px-6 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#44624a]/70 md:text-xs">
              SCROLL TO EXPLORE
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
      </motion.section>
    </div>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const sectionProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const layoutOpacity = useTransform(sectionProgress, [0, 0.16, 1], [0.18, 1, 1]);
  const layoutY = useTransform(sectionProgress, [0, 0.22], [44, 0]);

  const imageOpacity = useTransform(sectionProgress, [0.06, 0.24, 1], [0, 1, 1]);
  const imageY = useTransform(sectionProgress, [0.06, 0.24], [36, 0]);

  const headlineOpacity = useTransform(sectionProgress, [0.14, 0.34, 1], [0, 1, 1]);
  const headlineY = useTransform(sectionProgress, [0.14, 0.34], [28, 0]);

  const bodyOpacity = useTransform(sectionProgress, [0.28, 0.48, 1], [0, 1, 1]);
  const bodyY = useTransform(sectionProgress, [0.28, 0.48], [24, 0]);

  const detailsOpacity = useTransform(sectionProgress, [0.42, 0.62, 1], [0, 1, 1]);
  const detailsY = useTransform(sectionProgress, [0.42, 0.62], [22, 0]);

  return (
    <div className="sticky top-0 h-[100svh] w-full">
      <motion.section
        style={{ scale, rotate }}
        className={`${cinzel.variable} relative flex h-[100svh] w-full items-center overflow-hidden bg-[#f1ebe1] text-[#44624a]`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        <article className="relative z-10 mx-auto flex h-full w-full items-start justify-center px-6 pb-8 pt-16 md:items-center md:px-10 md:py-12">
          <motion.div
            style={{ opacity: layoutOpacity, y: layoutY }}
            className="w-full max-w-6xl px-2 py-2 sm:px-4 sm:py-6 lg:px-8 lg:py-8"
          >
            <div className="grid items-start gap-5 pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:pt-0">
              <motion.figure
                style={{ opacity: imageOpacity, y: imageY }}
                className="mx-auto mt-3 w-full max-w-[290px] rounded-[3px] border border-[#44624a]/10 bg-white p-3 shadow-[0_18px_50px_rgba(68,98,74,0.12)] sm:max-w-[360px] sm:p-4 lg:mt-0 lg:max-w-[380px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#d8d0c2]">
                  <Image
                    src="/dscf5168.jpg"
                    alt="Joshua and Vien embracing by the sea"
                    fill
                    sizes="(max-width: 1024px) 320px, 380px"
                    className="object-cover object-center"
                    priority={false}
                  />
                </div>
              </motion.figure>

              <div className="flex flex-col justify-start">
                <motion.h2
                  style={{
                    opacity: headlineOpacity,
                    y: headlineY,
                    textTransform: 'none',
                    fontVariantCaps: 'normal',
                  }}
                  className="font-sans text-center text-[2.05rem] normal-case leading-[0.94] tracking-[-0.05em] text-[#44624a] sm:text-[3.4rem] lg:text-right lg:text-[4.7rem]"
                >
                  Let&apos;s celebrate love,
                  <br />
                  laughter,
                  <br />
                  and happily ever after!
                </motion.h2>

                <motion.div
                  style={{ opacity: bodyOpacity, y: bodyY }}
                  className="mt-5 max-w-xl text-left lg:mt-12"
                >
                  <p
                    style={{ textTransform: 'none', fontVariantCaps: 'normal' }}
                    className="font-sans text-[0.96rem] normal-case leading-relaxed text-[#44624a]/88 sm:text-[1.45rem]"
                  >
                    Together with our beloved families, we humbly invite you to share in our joy as we pledge our love and commitment in a timeless celebration of marriage
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: detailsOpacity, y: detailsY }}
                  className="mt-5 max-w-md text-left pb-4 lg:mt-12"
                >
                  <p
                    style={{ fontFamily: '"Amoresa Aged Cinzel", "Amoresa Aged", var(--font-cinzel), serif' }}
                    className="text-base leading-relaxed text-[#44624a]/82 uppercase sm:text-[1.35rem]"
                  >
                    With Love,
                  </p>
                  <p
                    style={{ fontFamily: '"Snell Roundhand", "Brush Script MT", cursive' }}
                    className="mt-2 text-[2rem] leading-[0.88] text-[#6b8a68] sm:mt-4 sm:text-[3.25rem]"
                  >
                    Joshua and Vien
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </article>
      </motion.section>
    </div>
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
    <main ref={container} className="relative h-[200vh] bg-[#f1ebe1]">
      {/* forwarded ref attached to an inner wrapper to keep semantics */}
      <div ref={ref as React.RefObject<HTMLDivElement>} className="contents" />

      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />


    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
