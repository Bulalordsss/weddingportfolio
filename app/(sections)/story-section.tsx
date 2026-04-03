'use client';

import { PolaroidFlickThrough } from '@/components/ui/polaroid-flick-through';

const stages = [
  {
    id: 'story-stage-1',
    title: 'How it started',
    description:
      'The first chapter sits on the left, introducing the early moments that began everything. You can replace this with your real story copy later.',
    align: 'left' as const,
  },
  {
    id: 'story-stage-2',
    title: 'Falling into place',
    description:
      'As the stack grows, the second chapter moves to the right and lets the next three polaroids carry the middle of your story.',
    align: 'right' as const,
  },
  {
    id: 'story-stage-3',
    title: 'The forever chapter',
    description:
      'The final stage comes back to the left for the last three polaroids, giving the ending the same anchored feeling as the beginning.',
    align: 'left' as const,
  },
];

const cards = [
  { id: 'story-1', stage: 1, title: 'First glance', note: 'the beginning' },
  { id: 'story-2', stage: 1, title: 'Coffee date', note: 'easy conversations' },
  { id: 'story-3', stage: 1, title: 'Late walks', note: 'a little spark' },
  { id: 'story-4', stage: 2, title: 'Road trip', note: 'more adventures' },
  { id: 'story-5', stage: 2, title: 'Slow Sundays', note: 'home in each other' },
  { id: 'story-6', stage: 2, title: 'Big laughs', note: 'favorite memories' },
  { id: 'story-7', stage: 3, title: 'The question', note: 'a beautiful yes' },
  { id: 'story-8', stage: 3, title: 'Engaged era', note: 'planning forever' },
  { id: 'story-9', stage: 3, title: 'Next chapter', note: 'just getting started' },
];

export default function StorySection() {
  return (
    <section id="story" className="bg-[#f7f0e6] text-black">
      <PolaroidFlickThrough cards={cards} stages={stages} />
    </section>
  );
}
