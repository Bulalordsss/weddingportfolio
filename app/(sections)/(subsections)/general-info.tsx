'use client';

import * as React from 'react';

import { DestinationCard } from '@/components/ui/card-21';
import { BottomSheet } from '@/components/ui/bottom-sheet';

type InfoCard = {
  id: string;
  imageUrl: string;
  location: string;
  stats: string;
  themeColor: string;
  details: {
    title: string;
    body: string;
    bullets?: string[];
  };
};

const CARDS: InfoCard[] = [
  {
    id: 'wedding-party',
    imageUrl:
      'https://images.unsplash.com/photo-1522293531603-6df6d48a6d9b?auto=format&fit=crop&w=1400&q=60',
    location: 'Wedding Party',
    stats: 'Meet our favorite people',
    themeColor: '210 60% 32%',
    details: {
      title: 'Wedding Party',
      body: 'Here’s where you can list your bridesmaids, groomsmen, flower girls, ring bearers, etc.',
      bullets: ['Maid of Honor', 'Best Man', 'Bridesmaids & Groomsmen'],
    },
  },
  {
    id: 'travel',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60',
    location: 'Travel Logistics',
    stats: 'Getting here & staying here',
    themeColor: '30 70% 28%',
    details: {
      title: 'Travel Logistics',
      body: 'Add airport suggestions, driving/parking notes, and recommended hotels/areas to stay.',
      bullets: ['Nearest airport', 'Suggested hotels', 'Parking / rideshare'],
    },
  },
  {
    id: 'registry',
    imageUrl:
      'https://images.unsplash.com/photo-1520975693410-001d7e4b4d9a?auto=format&fit=crop&w=1400&q=60',
    location: 'Registry',
    stats: 'If you’d like to gift something',
    themeColor: '330 55% 30%',
    details: {
      title: 'Registry',
      body: 'Link your registry (or add a note if you prefer no gifts).',
      bullets: ['Registry link', 'Shipping address', 'Notes'],
    },
  },
  {
    id: 'dress-code',
    imageUrl:
      'https://images.unsplash.com/photo-1520962917969-5f6bb1bf1b8f?auto=format&fit=crop&w=1400&q=60',
    location: 'Dress Code',
    stats: 'What to wear',
    themeColor: '250 50% 30%',
    details: {
      title: 'Dress Code',
      body: 'Describe attire expectations and any color palette request.',
      bullets: ['Attire', 'Color palette (optional)', 'Comfort notes'],
    },
  },
  {
    id: 'kids',
    imageUrl:
      'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1400&q=60',
    location: 'Kids & Plus-Ones',
    stats: 'Guest guidelines',
    themeColor: '150 45% 25%',
    details: {
      title: 'Kids & Plus-Ones',
      body: 'Clarify if kids are invited, whether plus-ones are included, and any capacity notes.',
      bullets: ['Kids policy', 'Plus-one policy', 'RSVP by deadline'],
    },
  },
  {
    id: 'schedule',
    imageUrl:
      'https://images.unsplash.com/photo-1515165562835-c3b8c9f5e5f0?auto=format&fit=crop&w=1400&q=60',
    location: 'Day-Of Schedule',
    stats: 'Timeline overview',
    themeColor: '190 55% 28%',
    details: {
      title: 'Day-Of Schedule',
      body: 'Add a short schedule overview for guests (arrival time, ceremony, reception, send-off).',
      bullets: ['Arrival', 'Ceremony', 'Reception', 'Send-off'],
    },
  },
];

export default function GeneralInfoSection() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<InfoCard | null>(null);

  const onCardClick = (card: InfoCard) => {
    setActive(card);
    setOpen(true);
  };

  return (
    <section
      id="general-info"
      aria-label="General information"
      className="bg-[#f7f0e6] py-20 text-[#34271f]"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-2xl tracking-[-0.04em] text-[#3c2d24]/70 sm:text-3xl">
            and now some additional details...
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          {/* mobile: stacked cards (like ref), desktop: 3-up grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <div key={card.id} className="h-[220px] sm:h-[240px]">
                {/* Wrap DestinationCard with a button overlay so click opens details */}
                <div className="relative h-full w-full">
                  <DestinationCard
                    imageUrl={card.imageUrl}
                    location={card.location}
                    stats={card.stats}
                    href="#"
                    themeColor={card.themeColor}
                    className="h-full w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      onCardClick(card);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title={active?.details.title}
      >
        {active ? (
          <div className="text-[#34271f]">
            <p className="text-sm leading-relaxed text-[#34271f]/80">
              {active.details.body}
            </p>

            {active.details.bullets?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#34271f]/80">
                {active.details.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#34271f] px-6 py-2 text-xs font-semibold tracking-[0.22em] text-[#f7f0e6]"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : null}
      </BottomSheet>
    </section>
  );
}
