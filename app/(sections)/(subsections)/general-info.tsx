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
    imageSrc?: string;
    linkHref?: string;
    linkLabel?: string;
  };
};

const CARDS: InfoCard[] = [
  {
    id: 'ceremony',
    imageUrl:
      '/hero5.jpg',
    location: 'The Ceremony',
    stats: 'Families & witnesses only',
    themeColor: '150 45% 25%',
    details: {
      title: 'The Ceremony',
      body:
        'We lovingly share that our ceremony will be a quiet and intimate moment, held in the presence of our closest family and chosen witnesses. Though the ceremony itself is private, it would truly mean so much to us to celebrate with you at the reception where we can gather, share joy, and create beautiful memories together. Thank you for your understanding and for being part of our hearts on this special day.',
      bullets: ['Families and witnesses only'],
    },
  },
  {
    id: 'celebration',
    imageUrl: '/verdeli.jpg',
    location: 'The Celebration',
    stats: 'Venue details',
    themeColor: '190 55% 28%',
    details: {
      title: 'The Celebration',
      body:
        'Venue: Verdeli Garden & Cafe\nPurok 3B Brgy, Calinan, Baguio District, Davao City, 8000 Davao del Sur',
      linkHref: 'https://maps.app.goo.gl/21zcTcyEj84Lf12h8',
      linkLabel: 'Open in Google Maps',
      imageSrc: '/verdeli.jpg',
      bullets: ['Verdeli Garden & Cafe', 'Davao City'],
    },
  },
  {
    id: 'timeline',
    imageUrl:
      '/party.png',
    location: 'Timeline of Events',
    stats: 'Wedding schedule',
    themeColor: '30 70% 28%',
    details: {
      title: 'Timeline of Events',
      body:
        'Wedding Timeline:\n\nCall time: 9:00 am\nWedding ceremony: 10:00 am\nReception: 12:30 pm\nClosing ceremony: 4:00 pm',
      bullets: ['Ceremony', 'Photoshoot', 'Late lunch', 'Cocktails/Drinks (Chitchat)'],
    },
  },
  {
    id: 'map',
    imageUrl: '/map.png',
    location: 'Map Illustration of the Venue',
    stats: 'Venue Details',
    themeColor: '210 60% 32%',
    details: {
      title: 'Map Illustration of the Venue',
      body:
        'Here’s a map illustration to help you get familiar with the venue and find key areas once you arrive.\n\nFor the easiest route, you can also search “Verdeli Garden & Cafe” on Google Maps and follow the directions from your location.',
      linkHref: 'https://maps.app.goo.gl/21zcTcyEj84Lf12h8',
      linkLabel: 'Open directions in Google Maps',
      imageSrc: '/map.png',
      bullets: [
        'Tap “View Image” to open the full map',
        'Use Google Maps for turn-by-turn directions',
      ],
    },
  },
  {
    id: 'dress-code',
    imageUrl:
      '/dresscode.jpg',
    location: 'Dress Code',
    stats: 'Semi-formal attire',
    themeColor: '250 50% 30%',
    details: {
      title: 'Dress Code',
      body:
        'We kindly encourage our favorite people to join us in semi-formal attire. Your thoughtful coordination will help create a beautiful and cohesive atmosphere for our special day.\n\nPlease be guided below.\n\nWhite is reserved for the bride - thank you for understanding.',
      bullets: ['Semi-formal attire', 'Please be guided below', 'White is reserved for the bride'],
    },
  },
  {
    id: 'gift-corner',
    imageUrl:
      '/gift.png',
    location: 'Gift Corner',
    stats: 'Honeymoon fund / gifts',
    themeColor: '330 55% 30%',
    details: {
      title: 'Gift Corner',
      body:
        'Your presence is the greatest gift we could ask for. Should you wish to bless us further, a small gift or a contribution to our honeymoon fund would be deeply appreciated; a QR code will be provided for your convenience.',
        imageSrc: '/qr.jpg',
    },
  },
];

export default function GeneralInfoSection() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<InfoCard | null>(null);
  const [viewerSrc, setViewerSrc] = React.useState<string | null>(null);

  const onCardClick = (card: InfoCard) => {
    setActive(card);
    setOpen(true);
  };

  React.useEffect(() => {
    if (!open) setViewerSrc(null);
  }, [open]);

  React.useEffect(() => {
    if (!viewerSrc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewerSrc(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewerSrc]);

  return (
    <section
      id="general-info"
      aria-label="General information"
      className="bg-[#f1ebe1] py-20 text-[#44624a]"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-2xl tracking-[-0.04em] text-[#44624a]/75 sm:text-3xl">
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
          <div className="text-[#44624a]">
            <p className="whitespace-pre-line text-sm leading-relaxed text-[#44624a]/80">
              {active.details.body}
            </p>

            {active.details.linkHref ? (
              <div className="mt-4 flex justify-center">
                <a
                  href={active.details.linkHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#44624a]/10 px-5 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] transition-colors hover:bg-[#44624a]/15"
                >
                  {active.details.linkLabel ?? 'OPEN LINK'}
                </a>
              </div>
            ) : null}

            {active.id === 'dress-code' ? (
              <div className="mt-5 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewerSrc('/Men.jpg')}
                  className="w-full max-w-xs rounded-full bg-[#44624a]/10 px-5 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] transition-colors hover:bg-[#44624a]/15"
                >
                  MEN
                </button>
                <button
                  type="button"
                  onClick={() => setViewerSrc('/girl.jpg')}
                  className="w-full max-w-xs rounded-full bg-[#44624a]/10 px-5 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] transition-colors hover:bg-[#44624a]/15"
                >
                  WOMEN
                </button>
                <button
                  type="button"
                  onClick={() => setViewerSrc('/colorcode.jpg')}
                  className="w-full max-w-xs rounded-full bg-[#44624a]/10 px-5 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] transition-colors hover:bg-[#44624a]/15"
                >
                  COLOR CODE
                </button>
              </div>
            ) : null}

            {active.details.bullets?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#44624a]/80">
                {active.details.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex items-center justify-between gap-3">
              {active.details.imageSrc ? (
                <button
                  type="button"
                  onClick={() => setViewerSrc(active.details.imageSrc ?? null)}
                  className="rounded-full bg-[#44624a]/10 px-5 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] transition-colors hover:bg-[#44624a]/15"
                >
                  VIEW IMAGE
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#44624a] px-6 py-2 text-xs font-semibold tracking-[0.22em] text-[#f1ebe1]"
              >
                CLOSE
              </button>
            </div>

            {viewerSrc ? (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
                role="dialog"
                aria-label="Image viewer"
                onClick={() => setViewerSrc(null)}
              >
                <div
                  className="w-full max-w-5xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={viewerSrc} download className="block">
                    <img
                      src={viewerSrc}
                      alt={active.details.title}
                      className="mx-auto max-h-[80vh] w-full rounded-2xl object-contain"
                    />
                  </a>

                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <a
                      href={viewerSrc}
                      download
                      className="rounded-full bg-white/90 px-6 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] shadow-sm"
                    >
                      DOWNLOAD
                    </a>
                    <button
                      type="button"
                      onClick={() => setViewerSrc(null)}
                      className="rounded-full bg-white/90 px-6 py-2 text-xs font-semibold tracking-[0.22em] text-[#44624a] shadow-sm"
                      aria-label="Close image viewer"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </BottomSheet>
    </section>
  );
}
