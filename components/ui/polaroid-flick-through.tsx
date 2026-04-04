'use client';

import * as React from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';

// NOTE: Palette tokens (Elegant Matcha)
const MATCHA = {
  ink: '#44624a',
  sage: '#8ba888',
  mint: '#c0cfb2',
  cream: '#f1ebe1',
  white: '#ffffff',
};

export interface PolaroidStoryCard {
  id: string;
  stage: number;
  title: string;
  note: string;
  imageSrc?: string;
  alt?: string;
}

export interface PolaroidStoryStage {
  id: string;
  title: string;
  description: string;
  align: 'left' | 'right';
}

interface PolaroidFlickThroughProps {
  cards: PolaroidStoryCard[];
  stages: PolaroidStoryStage[];
  className?: string;
}

const PLACEHOLDER_BACKGROUNDS = [
  'from-[#44624a]/15 via-[#c0cfb2]/25 to-[#f1ebe1]',
  'from-[#8ba888]/20 via-[#f1ebe1] to-[#c0cfb2]/20',
  'from-[#44624a]/10 via-[#f1ebe1] to-[#8ba888]/15',
];

const ROTATIONS = [-4, 3, -2, 5, -3, 4, -5, 2, -4];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getCardState(cardIndex: number, currentIndex: number) {
  const distance = cardIndex - currentIndex;
  const revealedDepth = currentIndex - cardIndex;

  if (distance > 1) {
    return {
      opacity: 0,
      x: distance % 2 === 0 ? 110 : -110,
      y: 140,
      rotate: ROTATIONS[cardIndex] + (distance % 2 === 0 ? 8 : -8),
      scale: 0.9,
      zIndex: 0,
    };
  }

  if (distance === 1) {
    return {
      opacity: 0.72,
      x: 28,
      y: 58,
      rotate: ROTATIONS[cardIndex],
      scale: 0.965,
      zIndex: 20,
    };
  }

  if (distance === 0) {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: ROTATIONS[cardIndex],
      scale: 1,
      zIndex: 30,
    };
  }

  const depth = clamp(revealedDepth, 1, 8);

  return {
    opacity: clamp(1 - depth * 0.1, 0.24, 1),
    x: depth % 2 === 0 ? -depth * 2 : depth * 2,
    y: -depth * 14,
    rotate: ROTATIONS[cardIndex] * 0.45,
    scale: 1 - depth * 0.026,
    zIndex: 30 - depth,
  };
}

export function PolaroidFlickThrough({
  cards,
  stages,
  className = '',
}: PolaroidFlickThroughProps) {
  const containerRef = React.useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null);

  const activeCard = React.useMemo(
    () => (activeCardId ? cards.find((c) => c.id === activeCardId) ?? null : null),
    [activeCardId, cards],
  );

  const closeViewer = React.useCallback(() => setActiveCardId(null), []);

  React.useEffect(() => {
    if (!activeCard) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCard, closeViewer]);

  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('polaroid-viewer-toggle', {
        detail: { open: Boolean(activeCard) },
      }),
    );

    if (!activeCard) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(
        new CustomEvent('polaroid-viewer-toggle', {
          detail: { open: false },
        }),
      );
    };
  }, [activeCard]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(cards.length - 1, Math.floor(value * cards.length));
    setCurrentIndex(nextIndex);
  });

  const currentStageIndex = Math.min(
    stages.length - 1,
    Math.floor(currentIndex / 3),
  );
  const currentStage = stages[currentStageIndex];

  return (
    <section
      ref={containerRef}
      className={`relative h-[420vh] bg-[${MATCHA.cream}] ${className}`}
    >
      <div className="sticky top-0 flex min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f1ebe1_55%,#c0cfb2_120%)]" />
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c0cfb2]/25 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-10 pt-32 sm:px-8 sm:py-12 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl leading-none tracking-[-0.06em] text-[#44624a] sm:text-7xl lg:text-[7.5rem]">
              our love story
            </h2>
          </div>

          <div className="mt-5 flex flex-1 flex-col justify-center sm:mt-8 lg:mt-6">
            <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-[280px_minmax(0,1fr)_280px] lg:gap-10">
              <div className="hidden lg:block">
                {currentStage.align === 'left' ? (
                  <StageCopy
                    stage={currentStage}
                    stageNumber={currentStageIndex + 1}
                  />
                ) : null}
              </div>

              <div className="order-2 flex items-center justify-center lg:order-none">
                <div className="relative h-[430px] w-full max-w-[280px] sm:h-[520px] sm:max-w-[420px] lg:h-[560px] lg:max-w-[460px]">
                  {cards.map((card, index) => {
                    const state = getCardState(index, currentIndex);
                    const background =
                      PLACEHOLDER_BACKGROUNDS[(card.stage - 1) % PLACEHOLDER_BACKGROUNDS.length];

                    return (
                      <motion.figure
                        key={card.id}
                        className="absolute left-1/2 top-1/2 w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] border border-[#44624a]/15 bg-white p-2.5 shadow-[0_18px_45px_rgba(68,98,74,0.14)] sm:w-[280px] sm:p-3 lg:w-[330px]"
                        animate={state}
                        transition={{
                          type: 'spring',
                          stiffness: 170,
                          damping: 20,
                          mass: 0.72,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveCardId(card.id)}
                          className="group relative block w-full cursor-pointer rounded-[4px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#44624a]/60"
                          aria-label={`View polaroid: ${card.alt ?? card.title}`}
                        >
                          <motion.div
                            whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                            className="rounded-[4px]"
                          >
                            <div className="rounded-[3px] bg-[#f1ebe1] p-2 transition-shadow duration-300 group-hover:shadow-[0_14px_36px_rgba(68,98,74,0.18)]">
                              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#c0cfb2]/35">
                                {card.imageSrc ? (
                                  <Image
                                    src={card.imageSrc}
                                    alt={card.alt ?? card.title}
                                    fill
                                    sizes="(max-width: 640px) 280px, 330px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div
                                    className={`flex h-full w-full flex-col justify-between bg-gradient-to-br ${background} p-5 text-[#44624a]`}
                                  >
                                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#44624a]/65">
                                      Stage {card.stage}
                                    </span>
                                    <div>
                                      <p className="font-serif text-2xl leading-none tracking-[-0.04em]">
                                        {card.title}
                                      </p>
                                      <p className="mt-3 max-w-[16ch] text-sm leading-relaxed text-[#44624a]/70">
                                        Photo placeholder
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <figcaption className="px-2 pb-1 pt-4 text-center">
                              <p className="font-serif text-xl tracking-[-0.03em] text-[#44624a]">
                                {card.note}
                              </p>
                              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[#44624a]/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                Click to view
                              </p>
                            </figcaption>
                          </motion.div>
                        </button>
                      </motion.figure>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:block">
                {currentStage.align === 'right' ? (
                  <StageCopy
                    stage={currentStage}
                    stageNumber={currentStageIndex + 1}
                  />
                ) : null}
              </div>
            </div>

            <div className="order-1 mx-auto mt-10 max-w-[18rem] px-2 pb-4 text-center sm:mt-6 sm:max-w-sm lg:hidden">
              <StageCopy
                stage={currentStage}
                stageNumber={currentStageIndex + 1}
                compact
              />
            </div>
          </div>
        </div>

        {activeCard ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing polaroid: ${activeCard.alt ?? activeCard.title}`}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#44624a]/80 p-6"
            onClick={closeViewer}
          >
            <div
              className="relative w-full max-w-[720px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeViewer}
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#44624a] shadow-md transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="overflow-hidden rounded-xl bg-white p-4 pt-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:pt-4">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-lg bg-[#c0cfb2]/35">
                  {activeCard.imageSrc ? (
                    <Image
                      src={activeCard.imageSrc}
                      alt={activeCard.alt ?? activeCard.title}
                      fill
                      sizes="(max-width: 640px) 90vw, 520px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center text-[#44624a]">
                      <p className="font-serif text-3xl tracking-[-0.04em]">{activeCard.title}</p>
                      <p className="mt-3 text-sm text-[#44624a]/70">No image provided.</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 text-center">
                  <p className="font-serif text-2xl tracking-[-0.03em] text-[#44624a]">
                    {activeCard.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function StageCopy({
  stage,
  stageNumber,
  compact = false,
}: {
  stage: PolaroidStoryStage;
  stageNumber: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={compact ? 'space-y-3' : 'max-w-[17rem] space-y-3'}
    >
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#44624a]/55">
        Stage {stageNumber}
      </p>
      <h3 className="font-serif text-[2rem] leading-none tracking-[-0.04em] text-[#44624a] sm:text-3xl">
        {stage.title}
      </h3>
      <p className="text-sm leading-6 text-[#44624a]/70 sm:leading-7">{stage.description}</p>
    </motion.div>
  );
}

export default function ImageStackDemo() {
  return (
    <PolaroidFlickThrough
      stages={[
        {
          id: 'stage-1',
          title: 'First hellos',
          description: 'A sample stage for previewing the flick-through stack.',
          align: 'left',
        },
        {
          id: 'stage-2',
          title: 'More chapters',
          description: 'The deck keeps stacking as each new memory joins the story.',
          align: 'right',
        },
        {
          id: 'stage-3',
          title: 'Always us',
          description: 'Swap in real images later without changing the layout.',
          align: 'left',
        },
      ]}
      cards={Array.from({ length: 9 }, (_, index) => ({
        id: `demo-${index + 1}`,
        stage: Math.floor(index / 3) + 1,
        title: `Moment ${index + 1}`,
        note: `memory ${index + 1}`,
      }))}
    />
  );
}
