'use client';

import { FaqAccordion, type FaqItem } from '@/components/ui/faq-accordion';

const FAQS: FaqItem[] = [
	{
		question: 'Can I bring a plus one?',
		answer:
			'We are thrilled to celebrate with you! To keep our gathering close and intimate, we kindly request that guests attend as invited, without a plus-one.',
	},
	{
		question: 'What time should we arrive?',
		answer:
			'Please be there at 9:00 AM—let’s make the most of this special day together.',
	},
	{
		question: 'Can we bring our kids to the wedding?',
		answer:
			'As much as we love and adore your little ones, we are hoping to keep our celebration as intimate and adults-only as possible.',
	},
	{
		question: 'Are there parking lots available in the area?',
		answer: 'Parking is available inside the garden as soon as you arrive.',
	},
	{
		question: 'Can I sit wherever I want?',
		answer:
			'We have prepared a seating plan for the reception. Don’t worry! We’ve arranged it thoughtfully so you’ll be surrounded by good vibes and even better company.',
	},
	{
		question: 'Is RSVP really important?',
		answer:
			'Yes, confirming your RSVP is important to us. It helps us finalize the headcounts for meals and make sure everyone has a comfortable seat.',
	},
	{
		question: 'Did you say “YES” but have a change of plans?',
		answer:
			'We would truly love to celebrate with you, but we understand that unexpected things can happen.\n\nIf you’re unable to join us, please let us know at the soonest so we can thoughtfully reallocate your seats.',
	},
	{
		question: 'Did you say “NO” but can now attend?',
		answer:
			'We’re so happy you’re able to join us! Please let us know as soon as possible so we can check if seats are still available.\n\nIf any open up, we’ll let you know right away. Just kindly note that we may not be able to guarantee the same number of seats– or any at all– since some may have already been reassigned, but we truly hope to have you with us.',
	},
];

export default function FaqSection() {
	return (
		<section
			id="faq"
			aria-label="Questions and answers"
			className="relative overflow-hidden bg-[#f1ebe1] text-[#44624a]"
		>
			{/* background texture to match other sections */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
				style={{
					backgroundImage:
						'radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)',
					backgroundSize: '18px 18px',
				}}
			/>

			<div className="container relative mx-auto px-6 py-20 sm:py-24">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
						{/* Left: Hero copy */}
						<div className="lg:w-[360px] lg:flex-none lg:pt-6">
							<h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-6xl text-[#44624a]">
								Questions
								<br />
								and
								<br />
								answers
							</h2>

							<p className="mt-6 max-w-sm text-sm leading-relaxed text-[#44624a]/75">
								Can’t find the answer here?
								<br />
								<a
									href="#rsvp"
									className="underline decoration-[#44624a]/30 underline-offset-4 hover:decoration-[#44624a]/60"
								>
									Reach out to us
								</a>
							</p>
						</div>

						{/* Right: Scrollable list on desktop; normal flow on mobile */}
						<div className="min-w-0 flex-1">
							<div className="rounded-2xl bg-white/30 px-6 py-2 shadow-[0_18px_50px_rgba(68,98,74,0.10)] ring-1 ring-[#44624a]/15">
								<div className="lg:max-h-[520px] lg:overflow-auto lg:pr-2">
									<FaqAccordion items={FAQS} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
