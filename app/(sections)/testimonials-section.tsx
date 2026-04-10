'use client';

import { CircularTestimonials } from '@/components/ui/circular-testimonials';

const testimonials = [
  {
    quote:
      'April 2024—they met and instantly clicked. Days later, Joshua introduced Vien to his family, who welcomed her with open arms, marking the start of something special.',
    name: 'April 2024',
    designation: 'The beginning',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
  },
  {
    quote:
      'August 2024- after four months of getting to know each other and Joshua patiently courting her, it finally became official,they were “us.”',
    name: 'August 2024',
    designation: 'Officially “us”',
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
  },
  {
    quote:
      'December 2024- brought a new kind of love into their story. Their first baby, Shanks, a playful little cat who quickly became the heart of their home.',
    name: 'December 2024',
    designation: 'Shanks arrived',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80',
  },
  {
    quote:
      'April 2025-after a year together, Joshua took a heartfelt step and formally asked Vien’s family for their blessing or also known as “pamamanhikan” as they continued their journey toward forever.',
    name: 'April 2025',
    designation: 'Pamamanhikan',
    src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1600&q=80',
  },
  {
    quote:
      'October 2025—They welcomed their second fur baby, Mochi. Just like Shanks, Mochi brought more cuddles, playful moments, and lots of love to their home.',
    name: 'October 2025',
    designation: 'Mochi joined',
    src: 'https://images.unsplash.com/photo-1559235038-1dda5f3f7b3b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    quote:
      'April 2026—A dream come true! They got engaged and tied the knot, celebrating their love surrounded by joy, laughter, and the beginning of their forever together.',
    name: 'April 2026',
    designation: 'Forever starts',
    src: 'https://images.unsplash.com/photo-1523438097201-512ae7d59b20?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-label="Our Story Timeline"
      className="bg-[#f1ebe1] text-[#44624a]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-14 sm:py-20">
        <div className="w-full">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay
            colors={{
              name: '#44624a',
              designation: '#44624aB3',
              testimony: '#44624aCC',
              arrowBackground: '#44624a',
              arrowForeground: '#f1ebe1',
              arrowHoverBackground: '#6b8a68',
            }}
            fontSizes={{
              name: '1.75rem',
              designation: '1rem',
              quote: '1.05rem',
            }}
          />
        </div>
      </div>
    </section>
  );
}
