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
	{
		id: 'story-1',
		stage: 1,
		title: 'April 2024',
		note: 'the beginning',
		imageSrc: '/April 2024.jpeg',
		alt: 'April 2024',
	},
	{
		id: 'story-2',
		stage: 1,
		title: 'August 2024',
		note: 'easy conversations',
		imageSrc: '/August 2024.png',
		alt: 'August 2024',
	},
	{
		id: 'story-3',
		stage: 1,
		title: 'December 2024',
		note: 'a little spark',
		imageSrc: '/December 2024.jpeg',
		alt: 'December 2024',
	},
	{
		id: 'story-4',
		stage: 2,
		title: 'April 2025',
		note: 'more adventures',
		imageSrc: '/April 2025.jpeg',
		alt: 'April 2025',
	},
	{
		id: 'story-5',
		stage: 2,
		title: 'October 2025',
		note: 'home in each other',
		imageSrc: '/October 2025.jpeg',
		alt: 'October 2025',
	},
	{
		id: 'story-6',
		stage: 2,
		title: 'April 2026',
		note: 'favorite memories',
		imageSrc: '/April 2026.jpg',
		alt: 'April 2026',
	},
	{
		id: 'story-7',
		stage: 3,
		title: 'The question',
		note: 'a beautiful yes',
	},
	{
		id: 'story-8',
		stage: 3,
		title: 'Engaged era',
		note: 'planning forever',
	},
	{
		id: 'story-9',
		stage: 3,
		title: 'Next chapter',
		note: 'just getting started',
	},
];

export default function StorySection() {
	return (
		<section id="story" className="bg-[#f1ebe1] text-[#44624a]">
			<PolaroidFlickThrough cards={cards} stages={stages} />
		</section>
	);
}
