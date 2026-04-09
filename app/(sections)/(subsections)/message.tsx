'use client';

import { TextRevealByWord } from '@/components/ui/text-reveal';

export default function MessageSection() {
  return (
    <section
      id="message"
      aria-label="Message"
      className="relative overflow-hidden bg-[#f7f0e6] text-[#34271f]"
    >
      <div className="container mx-auto px-6 py-20">
        <TextRevealByWord
          className="mx-auto max-w-5xl"
          text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
        />
      </div>
    </section>
  );
}
